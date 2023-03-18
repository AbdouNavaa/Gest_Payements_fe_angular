import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSyndicatComponent } from './vote-syndicat.component';

describe('VoteSyndicatComponent', () => {
  let component: VoteSyndicatComponent;
  let fixture: ComponentFixture<VoteSyndicatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteSyndicatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteSyndicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
