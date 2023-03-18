import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteValideComponent } from './vote-valide.component';

describe('VoteValideComponent', () => {
  let component: VoteValideComponent;
  let fixture: ComponentFixture<VoteValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteValideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
