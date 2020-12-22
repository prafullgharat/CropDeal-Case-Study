import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedCropsComponent } from './published-crops.component';

describe('PublishedCropsComponent', () => {
  let component: PublishedCropsComponent;
  let fixture: ComponentFixture<PublishedCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
