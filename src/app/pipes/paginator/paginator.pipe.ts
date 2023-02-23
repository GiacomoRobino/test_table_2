import { Pipe, PipeTransform } from '@angular/core';
import { Record } from 'src/app/models/record';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  transform(record: Array<Record> | null, pageSize: number, currentPage: number | null): Array<Record> {
    if (!currentPage){
      currentPage = 0;
    }
    return record? record.slice((currentPage * pageSize), (currentPage + 1) * pageSize) : [];
  }

}
