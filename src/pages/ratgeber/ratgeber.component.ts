
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-ratgeber',
  templateUrl: './ratgeber.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
})
export class RatgeberComponent {
  private contentService = inject(ContentService);
  articles = this.contentService.getArticles();
}
