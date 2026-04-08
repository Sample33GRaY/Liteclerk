import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  submitted = false;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private readonly http: HttpClient) {}

  async onSubmit(form: NgForm): Promise<void> {
    this.submitted = true;
    this.submitSuccess = false;
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
    try {
      await firstValueFrom(
        this.http.post('/api/contact', {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      );

      form.resetForm();
      this.submitted = false;
      this.submitSuccess = true;
    } catch {
      this.submitError =
        'Unable to send your message right now. Please try again in a few minutes.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
