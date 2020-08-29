import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DengluComponent } from './denglu.component';

describe('DengluComponent', () => {
  let component: DengluComponent;
  let fixture: ComponentFixture<DengluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DengluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DengluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
