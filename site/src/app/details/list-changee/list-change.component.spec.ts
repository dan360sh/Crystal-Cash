import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChangeComponent } from './list-change.component';

describe('ListChangeeComponent', () => {
  let component: ListChangeComponent;
  let fixture: ComponentFixture<ListChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
