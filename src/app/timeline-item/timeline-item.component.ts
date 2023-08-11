import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent {
  @Input() data: { date: string; title: string; description: string } = {
    date: '',
    title: '',
    description: '',
  };
}
