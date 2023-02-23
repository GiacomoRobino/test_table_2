import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Record } from 'src/app/models/record';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent {

  public matchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit() {
    this.matchForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(1)]],
      homeResult: ['', Validators.required],
      awayResult: ['', Validators.required],
      timeDate: ['', Validators.required],
      timeTime: ['', Validators.required],
      homeName: ['', [Validators.required, Validators.minLength(1)]],
      awayName: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {
    const formValue = this.matchForm.value;
    this.dataService.addRecord(new Record(
      formValue.id,
      {home: formValue.homeName,
      away: formValue.awayName},
      this.convertDate(formValue.timeDate),
      formValue.timeTime,
      {home: formValue.homeResult,
      away: formValue.awayResult}
    ))
  }

  convertDate(date: string){
    const splitDate = date.split('-');
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0].substring(2)}`
  }

}
