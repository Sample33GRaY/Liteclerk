import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cta } from '../../components/cta/cta';

@Component({
  selector: 'app-mobile',
  imports: [Cta, RouterLink],
  templateUrl: './mobile.html',
  styleUrl: './mobile.css',
})
export class Mobile {

}
