import { Component } from '@angular/core';
import { Cta } from "../../components/cta/cta";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fis',
  imports: [Cta, CommonModule],
  templateUrl: './fis.html',
  styleUrl: './fis.css',
})
export class Fis {
  selectedImage: string | null = null;

  openImageModal(imageSrc: string) {
    this.selectedImage = imageSrc;
  }

  closeImageModal() {
    this.selectedImage = null;
  }
}
