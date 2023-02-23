import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, pipe, catchError, throwError } from 'rxjs';
import { Record } from 'src/app/models/record';
import { PaginationService } from '../pagination-service/pagination.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private targetUrl = '/assets/mock_response.json';
  private deletedRecords: Array<any> = [];
  private newRecords: Array<any> = [];
  private filterValue: (arg: Record) => boolean = (record: Record) => true;
  public error = new BehaviorSubject<boolean>(false);

  private dataSource: BehaviorSubject<Array<Record>> = new BehaviorSubject<Array<Record>>([]);
  private dataStream = new BehaviorSubject(this.dataSource.getValue());
  constructor(private http: HttpClient, private paginationService: PaginationService) {
    this.dataSource.pipe(this.addNewRecords(), this.filterDeletedData()).subscribe(data => this.dataStream.next(data))
   }
  

  getData(){
    this.http.get<any>(this.targetUrl).pipe(this.parseResponse(), this.parseResponseBody(), this.applyFilter(), catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      this.error.next(true);
      return throwError(err);
  }))
      .subscribe((dataList: any) => this.dataSource.next(dataList));
  }

  getDataStream(): Observable<Array<Record>> {
    return this.dataStream;
  }

  parseResponse(){
    return map((data: any) => Object.entries(data.doc[0].data.matches).map(element => element[1]))
  }

  parseResponseBody(){
    return map((data: any) => data.map((element: any) =>  
    new Record(element._id,
              {home: element.teams.home.name, away: element.teams.away.name},
              element.time.date,
              element.time.time,
              {home: element.result.home, away: element.result.away},
              )
          )
      )
  }

  addNewRecords(){
    return map((rows: any) => [...this.newRecords, ...rows]);
  }

  applyFilter(){
    return map((rows: any) => rows.filter((record: Record) => this.filterValue(record)));
  }

  resetFilter(){
    this.filterValue = (record: Record) => true;
    this.getData();
    this.paginationService.setCurrentPage(0);
  }

  setFilter(filterFunction: (arg: Record) => boolean){
    this.filterValue = filterFunction;
    this.getData();
    this.paginationService.setCurrentPage(0);
  }

  filterDeletedData(){
      return map((rows: any) => rows.filter((singleRow: any) => {
        return !this.deletedRecords.some(item => item === singleRow.id)
      }))
  }

  deleteRecord(record: Record){
    this.deletedRecords.push(record.id);
    this.newRecords = this.newRecords.filter(newRecord => newRecord.id !== record.id);
    this.getData();
  }

  addRecord(newRecord: Record){
    this.deletedRecords = this.deletedRecords.filter(recordId => recordId !== newRecord.id);
    this.newRecords.push(newRecord);
    this.getData()
  }
}
