import { Component, OnInit, Input, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';
import { isArray } from 'util';
@Component({
  selector: 'app-transport-item',
  templateUrl: './transport-item.component.html',
  styleUrls: ['./transport-item.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => in', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.4s ease-in')
      ]),
      transition('in => out', [
        style({
          opacity: 1,
          transform: 'translateX(0%)'
        }),
        animate('0.4s 0.2s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class TransportItemComponent implements OnInit {
  @Output() changesEvent = new EventEmitter<any>();
  @Output() deleteItemOutput = new EventEmitter<number>();
  @Input() id: number;
  @Input() cpyData: any;
  state: string;

  showOther: boolean = false;
  prodType: "transport";
  res: any;
  name: string = "";
  type: string = "";
  distance: number;
  weight: number;
  other: number;
  economicAlocation: number;

  transportTypes = [];
  constructor() {
    this.state = "in";
    this.res = this.getRes();
    for (let i = 0; i < this.res["Transport"].length; i++) {
      this.transportTypes.push(Object.keys(this.res["Transport"][i]));
    }
    this.type = this.transportTypes[0];
  }

  //if data is being copied set attributes of this item to match cpyData attributes
  ngOnInit() {
    if (this.cpyData) {
      this.name = this.cpyData.data.name;
      this.type = this.cpyData.data.type;
      this.distance = this.cpyData.data.distance;
      this.weight = this.cpyData.data.weight;
      this.economicAlocation = this.cpyData.economicAlocation;
      if(this.cpyData.other){
        this.other = this.cpyData.other;
        this.showOther = true;
      }else{
        this.showOther = false;
      }
      this.changes(undefined);
    }
  }

  //delete this item
  deleteItem() {
    this.state = "out";
    this.deleteItemOutput.emit(this.id);
  }

  //get results from json document
  getRes() {
    let json;
    $.ajax({
      'async': false,
      'global': false,
      'url': "/assets/res.json",
      'dataType': "json",
      'success': function (data) {
        json = data;
      }
    });
    return json;
  }

  //notify other component that there has been a change and send changed data
  changes($event) {
    if (Array.isArray(this.type)) {
      this.type = this.type[0];
    }

    if (this.type === "Other") {
      this.showOther = true;
    } else {
      this.showOther = false;
    }

    let result = {
      "id": this.id,
      "name": this.name,
      "type": this.type,
      "distance": this.distance,
      "weight": this.weight,
      "impactArea": "Transport",
      "economicAlocation": this.economicAlocation
    }
    if (this.showOther) {
      result["msa"] = this.other;
    } else {
      this.res["Transport"].forEach(element => {
        if (Object.keys(element)[0] == this.type) {
          result["msa"] = element[this.type]
        }
      });
    }

    this.changesEvent.emit(result);
  }

  //get item data
  getData() {
    let result = {
      "name": this.name,
      "type": this.type,
      "distance": this.distance,
      "weight": this.weight,
      "impactArea": "Transport",
      "economicAlocation": this.economicAlocation,
    }

    if(this.showOther){
      result["other"]=this.other;
    }else{
      result["other"]=false;
    }

    return result;
  }
}
