import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-column-header',
  templateUrl: './single-column-header.component.html',
  styleUrls: ['./single-column-header.component.css']
})
export class SingleColumnHeaderComponent {
  @Input() columnName: string = '';

}
