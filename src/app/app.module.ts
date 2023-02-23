import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RowComponent } from './components/row/row.component';
import { TableComponent } from './components/table/table.component';
import { AddMatchComponent } from './components/table/add-match/add-match.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableHeaderComponent } from './components/table/table-header/table-header.component';
import { SingleColumnHeaderComponent } from './components/table/table-header/single-column-header/single-column-header.component';
import { PaginatorPipe } from './pipes/paginator/paginator.pipe';
import { PaginatorComponent } from './components/table/paginator/paginator.component';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    TableComponent,
    AddMatchComponent,
    TableHeaderComponent,
    SingleColumnHeaderComponent,
    PaginatorPipe,
    PaginatorComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
