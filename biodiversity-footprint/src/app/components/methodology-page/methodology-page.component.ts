import { Component, OnInit } from '@angular/core';
import res from "../../../assets/res2.json"


@Component({
  selector: 'app-methodology-page',
  templateUrl: './methodology-page.component.html',
  styleUrls: ['./methodology-page.component.css']
})
export class MethodologyPageComponent implements OnInit {

  title = 'Description of components';
  public res: any = res;
  footprintTypes: any[] = [];

  selectedFTypes: any[];
  impactArea: "";
  type = "";
  emptyOption: boolean;

  constructor() {
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
  setNewFootprintType(event: any) {
    const type = event.target.value;   
    this.impactArea = type;
    this.type = Object(this.res["" + type + ""]);
    let a: any[] = [];
    this.res["" + type + ""].forEach((element: any) => {
      a.push(Object(element));
    });
    this.selectedFTypes = a;
  }
}
