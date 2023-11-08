import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollService } from '../shared/scroll.service';
import { interval as observableInterval } from 'rxjs';
import { takeWhile, scan, tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  scrolled: boolean = false;
  distance: any = 0;
  showTopBtn: boolean = false;
  isDropdownVisible: boolean = false;

  constructor(private scrollService: ScrollService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const container = document.getElementById('cont');
        if (container) {
          container.scrollTop = 0;
        }
      }
    });
  }

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

      this.distance < -200
        ? (this.showTopBtn = true)
        : (this.showTopBtn = false);
    } else {
      this.scrolled = false;
    }
  }

  @ViewChild('scrollable')
  scrollableContainer!: ElementRef;

  scrollToTop(el: any) {
    const duration = 600;
    const interval = 5;
    const move = (el.scrollTop * interval) / duration;
    observableInterval(interval)
      .pipe(
        scan((acc, curr) => acc - move, el.scrollTop),
        tap((position) => (el.scrollTop = position)),
        takeWhile((val) => val > 0)
      )
      .subscribe();
  }
}
