import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleXqComponent } from './article-xq.component';

describe('ArticleXqComponent', () => {
  let component: ArticleXqComponent;
  let fixture: ComponentFixture<ArticleXqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleXqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleXqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
