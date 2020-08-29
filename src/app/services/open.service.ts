import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as $ from "Jquery";
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class OpenService {
  public loginData:any = {
    name:'',
    password:''
  }

  public psText:any = '';

  public data:any;

  public ddd:any = 'disabled';
  

  constructor(public http:HttpClient, public router:Router) { }

  textCheck(){
    let reg = /\w{6,16}/;
    if(!reg.test(this.loginData.password)){
      this.psText = '密码格式错误，请重新输入'
      this.ddd = 'disabled';
    }else if(this.loginData.name == '' || this.loginData.password == ''){
      this.ddd = 'disabled';
    }else{
      this.psText = '';
      this.ddd = '';
    }
  }

  logIn(){
    const httpOptions = {headers: new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded' })};
    const d = $.param({"name":this.loginData.name,"pwd":this.loginData.password});
    let api = '/a/login'
    this.http.post(api,d,httpOptions).subscribe((response:any) => {
      console.log(response);
      this.data = response.data;
      this.psText = response.message;
      localStorage.setItem("this.psName", this.data.manager.name);
      localStorage.setItem("this.psId", this.data.role.name);
      if(response.code == 0){
        this.router.navigate(['/ht']);
      }
    })
  }
}
