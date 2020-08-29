import { Component, OnInit } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import axios from 'axios';

//日期选择框
import getISOWeek from 'date-fns/getISOWeek';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

import * as $ from "Jquery";
import { Observable, config } from 'rxjs';
import { NgForOf } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';

import { OpenService } from '../../../services/open.service';//登录数据服务

@Component({
  selector: 'app-article-lb',
  templateUrl: './article-lb.component.html',
  styleUrls: ['./article-lb.component.scss']
})
export class ArticleLbComponent implements OnInit {
  //状态和上线下线按钮的if判断
  public flag:any = '草稿';

  //搜索框数据存放
  public inputInfo:any = {
    input1: '',
    input2: ''
  };

  //搜索筛选状态和类型的value转换数字存放
  public getStatus:any = '';
  public getType:any = '';

  public DS:any = '';
  public DT:any = '';

  //日期选择框
  public date = null;
  public dateRange = [];
  public isEnglish = false;

  public lbdata:any[] = [];//列表数据存放

  public lbsize:number;//每页数据数量

  public lbPageIndex:number = 1;//列表页数


  constructor(private i18n: NzI18nService,public http:HttpClient,public router:Router,public Router:ActivatedRoute,public open:OpenService) { }

  //请求函数
  ngOnInit(): void {
    console.log(this.open.data);
    let lbData = "/a/article/search";
    this.axiosGet(lbData,{params:{
      page:this.lbPageIndex,
      size:10,
      title:this.inputInfo.input1,
      author:this.inputInfo.input2,
      startAt:this.DS,
      endAt:this.DT,
      type:this.getType,
      status:this.getStatus}}).subscribe((data:any) => {
      console.log(data);
      this.lbsize = data.data.data.total;
      this.lbdata = data.data.data.articleList;
      console.log(this.lbdata);
      for(let i = 0; i < this.lbdata.length; i++){
        if(this.lbdata[i].type == 0){
          this.lbdata[i].type = "首页banner";
        }else if(this.lbdata[i].type == 1){
          this.lbdata[i].type = '找职位banner';
        }else if(this.lbdata[i].type == 2){
          this.lbdata[i].type = '找精英banner';
        }else{
          this.lbdata[i].type = '行业大图'
        };
        
        if(this.lbdata[i].status == 1){
          this.lbdata[i].status = '草稿';
        }else{
          this.lbdata[i].status = '上线';
        };

        if(this.lbdata[i].title.length > 14){
          let str:any =  this.lbdata[i].title.substring(0,14) + '...';
          this.lbdata[i].title = str;
        }
      };
    });
  }

  //axios封装get请求
  axiosGet(api,pm){
    return new Observable((observer) => {
      axios.get(api,pm).then((response) => {
        observer.next(response);
      });
    })
  }

  //ng-zorro日期选择框函数
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }

  //筛选清空
  eliminate(){
    this.inputInfo.input1 = '';
    this.inputInfo.input2 = '';
    this.dateRange = [];
    $('#article-lb-zt').val('a1');
    $('#article-lb-lx').val('b1');
  }

  //列表筛选
  setNewData(){
    //筛选日期转时间戳
    let ds = new Date(this.dateRange[0]);
    this.DS = ds.getTime();
    let dt = new Date(this.dateRange[1]);
    this.DT = dt.getTime();

    //当没有输入创建时间，则将对应的开始时间和结束时间归零，以便于发送请求时报错
    if(!this.DS){
      this.DS = "";
    }
    if(!this.DT){
      this.DT = "";
    }

    //将状态和类型变为数据库识别的对应数字,注意，当选项为全部时，需要将请求的参数清空，否则会将上一次的选择作为参数上传，出现筛选和显示不同的bug
    if($('#article-lb-zt').val() == "a2"){
      this.getStatus = 1;
    }else if($('#article-lb-zt').val() == "a3"){
      this.getStatus = 2;
    }else {
      this.getStatus = '';
    }
    
    if($('#article-lb-lx').val() == "b2"){
      this.getType = 0;
    }else if($('#article-lb-lx').val() == "b3"){
      this.getType = 1;
    }else if($('#article-lb-lx').val() == "b4"){
      this.getType = 2;
    }else if($('#article-lb-lx').val() == "b5"){
      this.getType = 3;
    }else {
      this.getType = '';
    }

    this.ngOnInit();
  }

  //页码函数
  PageIndexChange(index){
    this.lbPageIndex = index;//将页码赋值给属性
    this.ngOnInit();//表示点击页码后触发函数请求对应页码的列表数据
  }

  //每页数量函数
  PageSizeChange(size){
    this.lbsize = size;
  }

  goOnline(upId,upStatus){
    if(upStatus == '草稿'){//取当前状态的相反状态并将文字改回数字形式，以便于put请求发送修改状态的参数
      var us = 2;
    }else{
      var us = 1;
    }
    const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded' })};
    const d = $.param({"id":upId,"status":us});
    let url = '/a/u/article/status';
    console.log(d);
    //put发送修改状态的请求，发送的状态参数就是修改后的状态，例如修改的状态为2，上传的参数就该是2
    this.http.put(url,d,httpOptions).subscribe((response:any) => {
      if(response.code == 0){
        location.reload();
      }
    })
  }

  Delete(deleteId){
    let url = '/a/u/article/' + deleteId;

    this.http.delete(url).subscribe((response:any) => {
      console.log(response);
      if(response.code == 0){
        location.reload();
      }
    })
  }

  newArticle(){
    this.router.navigateByUrl('/ht/article-xq');
  }
}
