import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  public homeTeams: Array<{team: string, selected: boolean}> = [];
  public awayTeams: Array<{team: string, selected: boolean}> = [];
  public selectedHomeTeams: Array<string> = [];
  public selectedAwayTeams: Array<string> = [];


  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getDataStream().subscribe(data => {
      this.homeTeams = [...new Set(data.map(match => match.matchTeams.home))].map(element => ({team: element, selected: false}));
      this.awayTeams = [...new Set(data.map(match => match.matchTeams.away))].map(element => ({team: element, selected: false}));
      this.homeTeams.sort((a,b) => a.team > b.team ? 1 : -1);
      this.awayTeams.sort((a,b) => a.team > b.team ? 1 : -1);
    })
  }

  resetFilter(){
    this.selectedHomeTeams = [];
    this.selectedAwayTeams = [];
    this.homeTeams.forEach((team, index) => this.homeTeams[index].selected = false);
    this.awayTeams.forEach((team, index) => this.awayTeams[index].selected = false);
    this.dataService.resetFilter();

  }

  applyFilter(){
    this.selectedHomeTeams = this.homeTeams.filter(team => team.selected).map(team => team.team);
    this.selectedAwayTeams = this.awayTeams.filter(team => team.selected).map(team => team.team);
    this.dataService.setFilter(this.getFilterFunction());
  }

  getFilterFunction(){
    return (match: Record) => (this.selectedHomeTeams.some(element => element === match.matchTeams.home) || this.selectedHomeTeams.length === 0) &&
    (this.selectedAwayTeams.some(element => element === match.matchTeams.away) || this.selectedAwayTeams.length === 0)

  }

}
