import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cta } from "../../components/cta/cta";
import { NgxParticlesModule } from '@tsparticles/angular';
import { MoveDirection, OutMode, Engine } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';

@Component({
  selector: 'app-desktop',
  imports: [Cta, NgxParticlesModule, RouterLink],
  templateUrl: './desktop.html',
  styleUrl: './desktop.css',
})
export class Desktop {
  public particlesOptions = {
    background: { color: { value: '#000814' } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' }
      },
      modes: {
        grab: { distance: 140, links: { opacity: 1 } }
      }
    },
    particles: {
      color: { value: ['#00f5d4', '#00b4d8'] },
      links: {
        color: '#00b4d8',
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: MoveDirection.none,
        outModes: { default: OutMode.out }
      },
      number: { value: 80 },
      size: { value: { min: 1, max: 3 } }
    }
  };

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

}
