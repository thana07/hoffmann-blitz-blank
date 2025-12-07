
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageGeneratorService } from '../../services/image-generator.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-ueber-uns',
  templateUrl: './ueber-uns.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, ContactFormComponent]
})
export class UeberUnsComponent {
  imageService = inject(ImageGeneratorService);

  get heroImage(): string {
    return this.imageService.getImageUrl('hero-about');
  }

  get teamImage(): string {
    return this.imageService.getImageUrl('branding-team');
  }

  get truckImage(): string {
    return this.imageService.getImageUrl('branding-truck');
  }

  get equipmentImage(): string {
    return this.imageService.getImageUrl('branding-equipment');
  }

  get certificateImage(): string {
    return this.imageService.getImageUrl('branding-certificate');
  }

  values = [
    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Zuverlässigkeit', desc: 'Wir halten, was wir versprechen - pünktlich und professionell' },
    { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Teamwork', desc: 'Ein eingespieltes Team für bestmögliche Ergebnisse' },
    { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Herzlichkeit', desc: 'Wir behandeln jeden Kunden mit Respekt und Empathie' },
    { icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title: 'Nachhaltigkeit', desc: 'Umweltgerechte Entsorgung und Recycling' }
  ];

  milestones = [
    { year: '2009', title: 'Gründung', desc: 'Start mit einem kleinen Team in Essen' },
    { year: '2012', title: 'Expansion', desc: 'Eröffnung weiterer Standorte in NRW' },
    { year: '2016', title: 'Zertifizierung', desc: 'TÜV-geprüft und ISO-zertifiziert' },
    { year: '2020', title: 'Digitalisierung', desc: 'Moderne Buchungs- und Kommunikationssysteme' },
    { year: '2024', title: '10+ Standorte', desc: 'Flächendeckend in ganz NRW präsent' }
  ];
}
