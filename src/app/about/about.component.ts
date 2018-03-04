import { Component, OnInit } from '@angular/core';
//import ActivatedRoute to access route parameters and Router to route
import { ActivatedRoute, Router } from '@angular/router'; 

import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  idParam: string;
  goals: any;

  //Create the dependency ingestion route and router
  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) { 
    this.route.params.subscribe(res => console.log(res.id));
    this.route.params.subscribe(params => this.idParam = params["id"]);
  }

  sendMeHome() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    console.log(this);
    this._data.goal.subscribe(res => this.goals = res);
  }

}
