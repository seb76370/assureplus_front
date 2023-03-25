import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultpoiComponent } from './resultpoi.component';

describe('ResultpoiComponent', () => {
  let component: ResultpoiComponent;
  let fixture: ComponentFixture<ResultpoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultpoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultpoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
