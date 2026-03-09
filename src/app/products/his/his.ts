import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cta } from "../../components/cta/cta";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-his',
  imports: [Cta, CommonModule, RouterLink],
  templateUrl: './his.html',
  styleUrl: './his.css',
})
export class His {
  currentSlide = 0;
  selectedImage: string | null = null;
  
  slides = [
    {
      title: 'PAYSLIP',
      image: '/Images/cloudhis/Payslip_Sample2.png',
      alt: 'Cloud HIS Payroll Dashboard'
    },
    {
      title: 'PAYSLIP',
      image: '/Images/cloudhis/Payslip_Sample.png',
      alt: 'Cloud HIS Payroll Dashboard'
    },
    {
      title: 'GOVERNMENT CONTRIBUTIONS',
      image: '/Images/cloudhis/Government.png',
      alt: 'Cloud HIS Government Contributions'
    }
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  openImageModal(imageSrc: string) {
    this.selectedImage = imageSrc;
  }

  closeImageModal() {
    this.selectedImage = null;
  }
}
