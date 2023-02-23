import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from './services/data-service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test';
  public errorSource!: Observable<boolean>;
  constructor(public dataService: DataService){}
  ngOnInit(){
    this.errorSource = this.dataService.error;
  }
}
