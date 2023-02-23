import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Record } from 'src/app/models/record';
import { DataService } from 'src/app/services/data-service/data.service';
import { PaginationService } from 'src/app/services/pagination-service/pagination.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() pageSizeSource!: BehaviorSubject<number>;
  public pageSize = 1;
  public currentPage = 0;
  public currentPageSource!: BehaviorSubject<number>;
  public dataSource$!: Observable<Array<Record>>;
  public pagesButtons: Array<number> = [];
  public dataSize = 0; 

  constructor(public dataService: DataService, private fb: FormBuilder, public paginationService: PaginationService){}
  form!: FormGroup;
  
  ngOnInit(){
    this.currentPageSource = this.paginationService.getCurrentPageSource();
    this.currentPageSource.subscribe(page => this.currentPage = page);
    this.dataSource$ = this.dataService.getDataStream();
    this.dataSource$.subscribe(data => { 
      this.dataSize = data.length;
      this.setPagesButtons()
    });
    
    this.pageSizeSource.subscribe(size => {
      this.pageSize = size;
      this.setPagesButtons()
    });

    this.form = this.fb.group({
      pageSize: [null, [Validators.required, Validators.min(1)]]
    });
  }

  setPagesButtons(){
    let counter = 1;
    this.pagesButtons = [];
    for(let i = 0; i < this.dataSize; i ++){
      if(i % this.pageSize === 0){
      this.pagesButtons.push(counter ++);
      }
    }
  }

  changePage(pageNumber: number){
    this.paginationService.setCurrentPage(pageNumber);
  }

  changePageSize(pageSize: number){
    this.paginationService.setCurrentPage(0);
    this.pageSizeSource.next(pageSize);
  }


  onSubmit() {
    this.changePage(0);
    this.changePageSize(this.form.value.pageSize);
  }
}
