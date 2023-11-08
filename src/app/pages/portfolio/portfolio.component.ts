import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  constructor(private sanitizer: DomSanitizer) {}

  websites = [
    {
      name: 'Dancehood CY',
      url: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://dancehoodcy.com/'
      ),
    },
  ];
}
