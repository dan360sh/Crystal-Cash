import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingAdsComponent } from './filling-ads.component';

describe('AdvertisementComponent', () => {
  let component: FillingAdsComponent;
  let fixture: ComponentFixture<FillingAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillingAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
