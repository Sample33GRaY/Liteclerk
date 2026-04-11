import { Component } from '@angular/core';
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
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  isSubmitting = false;
  submitMode: SubmissionChannel | null = null;
  submitNotice = '';
  submitError = '';
  private readonly pageUsername = 'jiovannesam.clarus';
  private readonly formspreeEndpoint = 'https://formspree.io/f/mgopgznw';

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
      const url = `https://www.facebook.com/messages/t/${this.pageUsername}`;
      const messengerWindow = window.open(url, '_blank');
      if (messengerWindow) {
        try {
          await navigator.clipboard.writeText(text);
          this.setFormNotice(
            `Form submitted. Messenger opened for ${this.pageUsername}. Your message has been copied automatically; finish by sending it in Messenger.`,
          );
        } catch {
          this.setFormNotice(
            `Form submitted. Messenger opened for ${this.pageUsername}. Send the message in Messenger to complete delivery.`,
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
