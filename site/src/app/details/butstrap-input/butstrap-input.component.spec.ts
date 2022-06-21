import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButstrapInputComponent } from './butstrap-input.component';

describe('ButstrapInputComponent', () => {
  let component: ButstrapInputComponent;
  let fixture: ComponentFixture<ButstrapInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButstrapInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButstrapInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
