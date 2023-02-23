import { Component, Input, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record';
import { DataService } from 'src/app/services/data-service/data.service';
import { PaginationService } from 'src/app/services/pagination-service/pagination.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit{
  @Input() record!: Record;
  @Input() recordId!: any;

  constructor(private dataService: DataService, private paginationService: PaginationService){}
  ngOnInit(): void {
  }

  deleteRecord(){
    this.dataService.deleteRecord(this.record);
    this.paginationService.setCurrentPage(0);
  }

  getKeys(item: any){
    return Object.keys(item)
  }

}
