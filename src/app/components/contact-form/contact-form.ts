import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

type SubmissionChannel = 'messenger' | 'gmail';

interface ContactFormValue {
  name: string;
  phone: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  isSubmitting = false;
  submitMode: SubmissionChannel | null = null;
  submitNotice = '';
  submitError = '';
  showModal = false;
  modalForm: NgForm | null = null;
  private readonly pageUsername = 'liteclerkcorp';
  private readonly formspreeEndpoint = 'https://formspree.io/f/mnjlaryz';

  private async copyToClipboard(text: string): Promise<boolean> {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Fall through to legacy copy strategy.
      }
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    } finally {
      document.body.removeChild(textarea);
    }

    return copied;
  }

  private getFormValues(form: NgForm): ContactFormValue {
    const { name, phone, email, message } = form.value as Partial<ContactFormValue>;

    return {
      name: name?.trim() ?? '',
      phone: phone?.trim() ?? '',
      email: email?.trim() ?? '',
      message: message?.trim() ?? '',
    };
  }

  private setFormNotice(message: string): void {
    this.submitError = '';
    this.submitNotice = message;
  }

  private setFormError(message: string): void {
    this.submitNotice = '';
    this.submitError = message;
  }

  private finishSubmission(): void {
    this.isSubmitting = false;
    this.submitMode = null;
  }

  openModal(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.submitNotice = '';
    this.submitError = '';
    this.modalForm = form;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.modalForm = null;
  }

  async handleMessengerFromModal(): Promise<void> {
    if (this.modalForm) {
      await this.sendToMessenger(this.modalForm);
      this.closeModal();
    }
  }

  async handleGmailFromModal(): Promise<void> {
    if (this.modalForm) {
      await this.sendThroughGmail(this.modalForm);
      this.closeModal();
    }
  }

  async sendToMessenger(form: NgForm): Promise<void> {
    this.submitNotice = '';
    this.submitError = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const { name, phone, email, message } = this.getFormValues(form);

    this.isSubmitting = true;
    this.submitMode = 'messenger';
    const text = [
      'Website Contact Inquiry:',
      `Name: ${name}`,
      `Phone Number: ${phone}`,
      `Email: ${email}`,
      `Message: ${message}`,
    ].join('\n\n');

    if (typeof window !== 'undefined') {
      const copied = await this.copyToClipboard(text);
      const url = `https://www.facebook.com/messages/t/${this.pageUsername}`;
      const messengerWindow = window.open(url, '_blank');

      if (messengerWindow) {
        if (copied) {
          this.setFormNotice(
            `Form copied and Messenger opened for ${this.pageUsername}. Paste and send to complete delivery.`,
          );
        } else {
          this.setFormNotice(
            `Messenger opened for ${this.pageUsername}, but auto-copy was blocked by your browser. Copy and send your message manually.`,
          );
        }
      } else {
        this.setFormError('Unable to open Messenger. Please allow popups and try again.');
      }
    }

    form.resetForm();
    this.finishSubmission();
  }

  async sendThroughGmail(form: NgForm): Promise<void> {
    this.submitNotice = '';
    this.submitError = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.formspreeEndpoint.startsWith('https://formspree.io/f/')) {
      this.setFormError('Set a valid Formspree endpoint in contact-form.ts before using the Gmail button.');
      return;
    }

    const values = this.getFormValues(form);

    this.isSubmitting = true;
    this.submitMode = 'gmail';

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('message', values.message);
      formData.append('subject', 'Website Contact Inquiry');

      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        this.setFormError('Unable to send through Gmail right now. Please try again.');
        return;
      }

      form.resetForm();
      this.setFormNotice('Form submitted. Sent through Gmail.');
    } catch {
      this.setFormError('Unable to send through Gmail right now. Please try again.');
    } finally {
      this.finishSubmission();
    }
  }
}
