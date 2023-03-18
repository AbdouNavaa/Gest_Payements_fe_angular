import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudientFormComponent } from './etudient-form.component';

describe('EtudientFormComponent', () => {
  let component: EtudientFormComponent;
  let fixture: ComponentFixture<EtudientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudientFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
