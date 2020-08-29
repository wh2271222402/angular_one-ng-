import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtComponent } from './ht.component';

describe('HtComponent', () => {
  let component: HtComponent;
  let fixture: ComponentFixture<HtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
