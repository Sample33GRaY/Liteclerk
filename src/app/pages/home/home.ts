import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SecondsectionComponent } from './secondsection/secondsection.component';
import { Cta } from "../../components/cta/cta";
import { Why } from "../../components/why/why";
import { ContactForm } from '../../components/contact-form/contact-form';


@Component({
  selector: 'app-home',
  standalone: true,
  
  // Add the BackgroundComponent to the imports array here:
  imports: [CommonModule, RouterModule, SecondsectionComponent, Cta, Why, ContactForm], 
  templateUrl: './home.html', 
  styleUrls: ['./home.css']
})
export class Home {
   logos = [
     { src: "/icons/aws-svgrepo-com.svg", alt: "AWS", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-aws)]" },
    { src: "/icons/sysprologo.svg", alt: "SYSPRO", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-syspro)]" },
    { src: "/icons/google-6.svg", alt: "GOOGLE", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-white)]" },
    { src: "/icons/azure-logo.svg", alt: "AZURE", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-azure)]" },
    { src: "/icons/discord-wordmark.svg", alt: "DISCORD", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-discord)]" },
    { src: "/icons/meta.svg", alt: "META", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-meta)]" },
    { src: "/icons/github.svg", alt: "GITHUB", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-white)]" },
    { src: "/icons/google-logo.svg", alt: "GOOGLE_ALT", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-white)]" },
    { src: "/icons/rockson-logo.svg", alt: "ROCKSON", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-primary)]" },
    { src: "/icons/polkadot-logo.svg", alt: "POLKADOT", glowClass: "hover:drop-shadow-[0_0_20px_var(--glow-primary)]" },

  ];
}


