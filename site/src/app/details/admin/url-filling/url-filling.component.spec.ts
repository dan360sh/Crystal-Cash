import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlFillingComponent } from './url-filling.component';

describe('UrlFillingComponent', () => {
  let component: UrlFillingComponent;
  let fixture: ComponentFixture<UrlFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlFillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
