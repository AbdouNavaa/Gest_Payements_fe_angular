import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteHomePageComponent } from './vote-home-page.component';

describe('VoteHomePageComponent', () => {
  let component: VoteHomePageComponent;
  let fixture: ComponentFixture<VoteHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
