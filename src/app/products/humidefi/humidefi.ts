import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cta } from '../../components/cta/cta';

@Component({
  selector: 'app-humidefi',
  imports: [Cta, RouterLink],
  templateUrl: './humidefi.html',
  styleUrl: './humidefi.css',
})
export class Humidefi {}
