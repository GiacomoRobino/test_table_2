import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleColumnHeaderComponent } from './single-column-header.component';

describe('SingleColumnHeaderComponent', () => {
  let component: SingleColumnHeaderComponent;
  let fixture: ComponentFixture<SingleColumnHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleColumnHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleColumnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
