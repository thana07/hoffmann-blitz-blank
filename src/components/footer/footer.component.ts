import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';

interface QuickLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class FooterComponent {
  private contentService = inject(ContentService);

  locations = this.contentService.getLocations();
  services = this.contentService.getServices();
  currentYear = new Date().getFullYear();

  quickLinks: QuickLink[] = [
    { path: '/', label: 'Home' },
    { path: '/ueber-uns', label: 'Über Uns' },
    { path: '/dienstleistungen', label: 'Dienstleistungen' },
    { path: '/standorte', label: 'Standorte' },
    { path: '/kostenrechner', label: 'Kostenrechner' },
    { path: '/ratgeber', label: 'Ratgeber' },
  ];
}
