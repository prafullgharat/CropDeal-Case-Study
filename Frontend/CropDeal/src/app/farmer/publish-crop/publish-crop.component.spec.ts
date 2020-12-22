import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishCropComponent } from './publish-crop.component';

describe('PublishCropComponent', () => {
  let component: PublishCropComponent;
  let fixture: ComponentFixture<PublishCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishCropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
