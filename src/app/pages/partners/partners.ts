import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and [class]
import { RouterLink } from '@angular/router';
import { Cta } from "../../components/cta/cta";

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [Cta, CommonModule, RouterLink], 
  templateUrl: './partners.html',
  styleUrl: './partners.css',
})
export class Partners {
  // Array size should match the number of cards in your HTML
  partners = [1, 2, 3, 4, 5]; 
  activeIndex = 0;

  updateDots(el: HTMLElement) {
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.querySelector('div')?.clientWidth || 288; // w-72 is 288px
    const gap = 24; // gap-6 is 24px
    
    // Calculate index based on scroll position
    this.activeIndex = Math.round(scrollLeft / (cardWidth + gap));
  }

  scrollToIndex(index: number, el: HTMLElement) {
    const cardWidth = el.querySelector('div')?.clientWidth || 288;
    const gap = 24;
    el.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  }
}
