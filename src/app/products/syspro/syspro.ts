import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cta } from "../../components/cta/cta";

@Component({
  selector: 'app-syspro',
  imports: [Cta, RouterLink],
  templateUrl: './syspro.html',
  styleUrl: './syspro.css',
})
export class Syspro {

}
