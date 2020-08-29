import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as $ from "Jquery";

import axios from 'axios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-xq',
  templateUrl: './article-xq.component.html',
  styleUrls: ['./article-xq.component.scss']
})
export class ArticleXqComponent implements OnInit {

  public xqId:any = '';
  public xqdata:any = [];

  public upDraftCode:any = '';

  public file:any = '';
  public name:any = '';
  public size:any = '';
  public result:any = '';

  public Progress:number = 0;
  public icon:boolean = false;
  public dis:any = 'disabled';

  constructor(public router:Router,public http:HttpClient,public Router:ActivatedRoute) { }

  ngOnInit(): void {
    this.Router.queryParams.subscribe((data) => {
      this.xqId = data.id;
    });
    if(this.xqId > 0){
      let xqData = '/a/article/' + this.xqId;
      this.http.get(xqData).subscribe((response:any) => {
        this.xqdata = response.data.article;
        console.log(this.xqdata);
      })
    }else{
      this.xqId = '';
      this.xqdata.title = '';
      this.xqdata.img = '';
      this.xqdata.url = '';
      this.xqdata.type = '';
    }
  }


  getFile(e){
    this.file = e.target.files[0];
    this.name = this.file.name;
    this.size = Math.floor((this.file.size / 1024 / 1024) * 100) / 100 + 'Mb';

    let reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.addEventListener("load", () => {
      this.xqdata.img = reader.result;
      this.result = reader.result;
      if(this.file){
        this.dis = '';
      }else{
        this.dis = 'disabled';
      }
    }, false);
  };

  axiosPost(api,pm,header){
    return new Observable((observer) => {
      axios.post(api,pm,header).then((response) => {
        observer.next(response);
      });
    })
  }

  upload(){
    this.Progress = 1;
    setInterval(() =>{
      if(this.Progress < 99 && this.Progress > 0){
        this.Progress++
      }
    },50);
    let formData:any = new FormData();
    formData.append('file', this.file);
    const httpOptions = {headers: { 'content-Type': 'multipart/form-data' }};
    let api = '/a/u/img/task'
    this.axiosPost(api,formData,httpOptions).subscribe((data:any) => {
      console.log(data);
      this.xqdata.img = data.data.data.url;
      if(data){
        this.Progress = 100;
        this.icon = true;

      }
    })
  }

  delete(){
    this.name = '';
    this.size = '';
    this.xqdata.img = '';
    this.icon = false;
    this.Progress = 0;
  }

  draft(){
    if(this.xqdata.title == ''){
      alert('请输入标题')
    }else if(this.xqdata.type == ''){
      alert('请选择类型')
    }else if(this.xqdata.url == ''){
      alert('请输入跳转链接')
    }else if(this.xqdata.img == ''){
      alert('请选择图片并上传')
    }else if(this.xqId > 0){
      const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded' })};
      const d = $.param({"title":this.xqdata.title,"status":1,"img":this.xqdata.img,"content":this.xqdata.content,"url":this.xqdata.url,"industry":this.xqdata.industry,"createAt":this.xqdata.createAt,"type":this.xqdata.type});
      let upDraft = '/a/u/article/' + this.xqId;
      this.http.put(upDraft,d,httpOptions).subscribe((response:any) => {
        if(response.code == 0){
          this.router.navigateByUrl('/ht/article-lb');
        }
      })
    }else{
      const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded' })};
      const d = $.param({"title":this.xqdata.title,"status":1,"img":this.xqdata.img,"content":this.xqdata.content,"url":this.xqdata.url,"industry":this.xqdata.industry,"createAt":this.xqdata.createAt,"type":this.xqdata.type});
      let upDraft = '/a/u/article/' + this.xqId;
      this.http.post(upDraft,d,httpOptions).subscribe((response:any) => {
        if(response.code == 0){
          this.router.navigateByUrl('/ht/article-lb');
        };
      })
    };
  };

  upLine(){
    if(this.xqdata.title == ''){
      alert('请输入标题')
    }else if(this.xqdata.type == ''){
      alert('请选择类型')
    }else if(this.xqdata.url == ''){
      alert('请输入跳转链接')
    }else if(this.xqdata.img == ''){
      alert('请选择图片并上传')
    }else if(this.xqId > 0){
      const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded' })};
      const d = $.param({"title":this.xqdata.title,"status":2,"img":this.xqdata.img,"content":this.xqdata.content,"url":this.xqdata.url,"industry":this.xqdata.industry,"createAt":this.xqdata.createAt,"type":this.xqdata.type});
      let upDraft = '/a/u/article/' + this.xqId;
      this.http.put(upDraft,d,httpOptions).subscribe((response:any) => {
        if(response.code == 0){
          this.router.navigateByUrl('/ht/article-lb');
        }
      })
    }else{
      const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded' })};
      const d = $.param({"title":this.xqdata.title,"status":2,"img":this.xqdata.img,"content":this.xqdata.content,"url":this.xqdata.url,"industry":this.xqdata.industry,"createAt":this.xqdata.createAt,"type":this.xqdata.type});
      let upDraft = '/a/u/article/' + this.xqId;
      this.http.post(upDraft,d,httpOptions).subscribe((response:any) => {
        if(response.code == 0){
          this.router.navigateByUrl('/ht/article-lb');
        };
      })
    };
  };

  industry(){
    if(this.xqdata.type == 3){
      this.xqdata.industry = 0;
    }else{
      this.xqdata.industry = '';
    }
  }
}
