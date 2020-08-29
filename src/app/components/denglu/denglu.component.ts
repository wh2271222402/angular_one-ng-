import { Component, OnInit } from '@angular/core';

import { OpenService } from '../../services/open.service';

@Component({
  selector: 'app-denglu',
  templateUrl: './denglu.component.html',
  styleUrls: ['./denglu.component.scss']
})
export class DengluComponent implements OnInit {

  constructor(public open:OpenService) { }

  ngOnInit(): void {
  }
  


}
