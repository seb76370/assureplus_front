import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConnexionComponent } from './modal-connexion.component';

describe('ModalConnexionComponent', () => {
  let component: ModalConnexionComponent;
  let fixture: ComponentFixture<ModalConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConnexionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
