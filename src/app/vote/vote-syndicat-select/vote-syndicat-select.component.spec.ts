import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSyndicatSelectComponent } from './vote-syndicat-select.component';

describe('VoteSyndicatSelectComponent', () => {
  let component: VoteSyndicatSelectComponent;
  let fixture: ComponentFixture<VoteSyndicatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteSyndicatSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteSyndicatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
