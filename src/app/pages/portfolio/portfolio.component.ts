import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  websites: any = [];
  screenWidth: number = window.innerWidth;

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    this.setList();
  }

  ngOnInit(): void {
    this.setList();
  }

  setList(): void {
    this.websites = [
      {
        name: 'Dancehood CY',
        url: 'https://dancehoodcy.com/',
        sanitazedURL: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://dancehoodcy.com/'
        ),
      },

      {
        name: 'DMARC Right',
        url: 'https://dmarcright.com/',
        sanitazedURL: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://dmarcright.com/'
        ),
      },

      {
        name: 'Channel IT',
        url: 'https://channel-it.com/',
        sanitazedURL: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://channel-it.com/'
        ),
      },
    ];

    if (this.screenWidth >= 500) {
      this.websites.forEach((item: any) => {
        item.width = '375px';
        item.height = '550px';
      });
    } else {
      this.websites.forEach((item: any) => {
        item.width = '300px';
        item.height = '480px';
      });
    }
  }
}
