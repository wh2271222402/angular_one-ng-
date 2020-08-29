import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLbComponent } from './article-lb.component';

describe('ArticleLbComponent', () => {
  let component: ArticleLbComponent;
  let fixture: ComponentFixture<ArticleLbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
