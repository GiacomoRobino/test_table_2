import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Record } from 'src/app/models/record';
import { DataService } from 'src/app/services/data-service/data.service';
import { PaginationService } from 'src/app/services/pagination-service/pagination.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  public dataSource!: Observable<Array<Record>>;
  public showAddMatch = false;
  public showFilter = false;
  public pageSize = 10;
  public pageNumber = 0;
  public pageSizeSource: BehaviorSubject<number> = new BehaviorSubject(this.pageSize);
  public currentPageSource: BehaviorSubject<number> = new BehaviorSubject(this.pageNumber);

  constructor(public dataService: DataService, public paginationService: PaginationService){}
  
  ngOnInit(){
    this.dataSource = this.dataService.getDataStream();
    this.dataService.getData();
    this.currentPageSource.subscribe(page => this.pageNumber = page);
    this.pageSizeSource.subscribe(size => this.pageSize = size);

  }
}
