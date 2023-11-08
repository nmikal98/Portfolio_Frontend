import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/shared/scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  educationData = [
    {
      date: '09/2017 - 06/2023',
      title: "Bachelor's Degree | Computer Sciense",
      description:
        'University of Cyprus | Faculty of Pure and Applied Sciences',
    },

    {
      date: '07/2016 - 08/2017',
      title: 'Obligatory Military Service',
      description: 'Infantry Battalion',
    },

    {
      date: '09/2013 - 06/2016',
      title: 'High School',
      description: 'Lyceum of Apostle Mark',
    },
    // Add more education data as needed
  ];

  experienceData = [
    {
      date: '03/2022 - CURRENT',
      title: 'Senior Software Developer',
      description: 'Channel IT Ltd, Nicosia',
    },
    {
      date: '08/2021 - 03/2022',
      title: 'Junior Software Developer',
      description: 'GnosisNet Ltd, Nicosia',
    },

    // Add more experience data as needed
  ];

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.getScrollObservable().subscribe((scrollPosition) => {
      const elementsArray = Array.from(
        document.getElementsByClassName('fade-in')
      );
      elementsArray.forEach((element) => {
        if (isElementInMiddleOfViewport(element)) {
          element?.classList.add('active');
        } else {
          element?.classList.remove('active');
        }
      });
    });
  }
}

function isElementInMiddleOfViewport(element: any) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportMiddle = windowHeight / 2;
  const marginStart = viewportMiddle - 300; // 300 pixels above the center
  const marginEnd = viewportMiddle + 300; // 300 pixels below the center

  // Check if the middle of the element is within the vertical range of the viewport with margins
  const verticalMiddleInView =
    rect.top <= marginEnd && rect.bottom >= marginStart;

  // Check if the element is within the horizontal viewport
  const horizontalInView =
    rect.left <= window.innerWidth && rect.left + rect.width >= 0;

  // Return true if both vertical middle and horizontal positions are in view
  return verticalMiddleInView && horizontalInView;
}
