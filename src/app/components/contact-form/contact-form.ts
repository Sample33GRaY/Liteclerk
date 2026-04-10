import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  isSubmitting = false;
  submitNotice = '';
  submitError = '';
  private readonly pageUsername = 'jiovannesam.clarus';

  async sendToMessenger(form: NgForm): Promise<void> {
    this.submitNotice = '';
    this.submitError = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const { name, phone, email, message } = form.value as {
      name: string;
      phone: string;
      email: string;
      message: string;
    };

    this.isSubmitting = true;
    const text = [
      'Website Contact Inquiry:',
      `Name: ${name.trim()}`,
      `Phone Number: ${phone.trim()}`,
      `Email: ${email.trim()}`,
      `Message: ${message.trim()}`,
    ].join('\n\n');

    if (typeof window !== 'undefined') {
      const url = `https://www.facebook.com/messages/t/${this.pageUsername}`;
      const messengerWindow = window.open(url, '_blank');
      if (messengerWindow) {
        try {
          await navigator.clipboard.writeText(text);
          this.submitNotice =
            `Form submitted. Messenger opened for ${this.pageUsername}. Your message has been copied automatically; finish by sending it in Messenger.`;
        } catch {
          this.submitNotice =
            `Form submitted. Messenger opened for ${this.pageUsername}. Send the message in Messenger to complete delivery.`;
        }
      } else {
        this.submitError =
          'Unable to open Messenger. Please allow popups and try again.';
      }
    }

    form.resetForm();
    this.isSubmitting = false;
  }
}
