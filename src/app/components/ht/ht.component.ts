import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OpenService } from '../../services/open.service'


@Component({
  selector: 'app-ht',
  templateUrl: './ht.component.html',
  styleUrls: ['./ht.component.scss']
})
export class HtComponent implements OnInit {

  public flag:boolean = false;

  public psName:any = '';
  public psId:any = '';

  @ViewChild('username') username:any;
  @ViewChild('userid') userid:any;

  constructor(public router:Router, public Router:ActivatedRoute,public open:OpenService) { }

  ngOnInit(): void {
    this.psName = localStorage.getItem("this.psName");
    this.psId = localStorage.getItem("this.psId");
  }

  article(){
    this.flag = !this.flag;
  }

  Exit(){
    this.router.navigateByUrl('/denglu');
  }

}
