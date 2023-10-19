import { Component, HostListener, Inject } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  scrolled: boolean = false;
  distance: any = 0;

  isDropdownVisible: boolean = false;

  constructor(private scrollService: ScrollService) {}

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  onScroll(e: any) {
    const scrollPosition = (e.target as Element).scrollTop;
    this.scrollService.emitScrollEvent(scrollPosition);

    const element = document.getElementById('scrollable');

    this.distance = element?.getBoundingClientRect().top;

    if (this.distance != 0) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
}
