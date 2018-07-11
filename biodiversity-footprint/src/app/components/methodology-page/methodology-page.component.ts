import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { log } from "util";
import * as result from '../../../assets/res2.js';


@Component({
  selector: 'app-methodology-page',
  templateUrl: './methodology-page.component.html',
  styleUrls: ['./methodology-page.component.css']
})
export class MethodologyPageComponent implements OnInit {

  title = 'Description of components';
  res: any;
  footprintTypes = [];

  selectedFTypes = undefined;
  impactArea: "";
  type = "";
  emptyOption: boolean;

  constructor() {
    this.res = result;
    this.emptyOption = true;
    let keys = Object.keys(this.res);
    keys.forEach(element => {
      this.emptyOption = false;
      this.footprintTypes.push(element);
    });
  }

  ngOnInit() {

  }

  //show footprint items with matching type
  setNewFootprintType(type: any) {
    this.impactArea = type;
    this.type = Object(this.res["" + type + ""]);
    let a = [];
    this.res["" + type + ""].forEach(element => {
      a.push(Object(element));
    });
    this.selectedFTypes = a;
  }
}
