import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';//路由
import { AppComponent } from './app.component';//组件
import { FormsModule } from '@angular/forms';//双向数据绑定
import { HttpClientModule } from '@angular/common/http';//http请求
//ng-zorro自动引入
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';//日期选择框

import { NzPaginationModule } from 'ng-zorro-antd/pagination';//列表分页

import { OpenService } from './services/open.service';

//自定义组件
import { DengluComponent } from './components/denglu/denglu.component';
import { HtComponent } from './components/ht/ht.component';
import { ArticleLbComponent } from './components/ht/article-lb/article-lb.component';
import { ArticleXqComponent } from './components/ht/article-xq/article-xq.component';
import { WelcomeComponent } from './components/ht/welcome/welcome.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    DengluComponent,
    HtComponent,
    ArticleLbComponent,
    ArticleXqComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzDatePickerModule,
    NzPaginationModule
  ],
  providers: [
    {provide: NZ_I18N,useValue: zh_CN,},
    OpenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
