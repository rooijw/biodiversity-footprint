import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';
import res from "../../../assets/res.json";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
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



// <app-item (changesEvent)="receiveItemInfo($event)"></app-item>  declare component like this
export class ItemComponent implements OnInit {

  @Output() changesEvent = new EventEmitter<any>();
  @Output() deleteItemOutput = new EventEmitter<number>();
  @Input() id: number;
  @Input() prodType: string;
  @Input() cpyData: any = {};

  public res: any = res;
  other: number;
  itemInfo: any;
  footprintTypes: string[] = [];
  selectedFTypes: any[] = [];
  showExtraDropdown = false;
  showExtraInput = false;
  impactArea:string = "";
  state: string;

  name = "";
  amount: number;
  type = "";
  msa = 0;
  economicAlocation: number;
  placeholderValue = "Enter value";
  
  
  constructor() {
    this.state = "in";
    let keys = Object.keys(this.res);
    keys.forEach((element: string) => {
      if (element != "Transport") {
        this.footprintTypes.push(element);
      }
    });
    this.itemInfo = {
      "id": 0,
      "name": "",
      "impactArea": "",
      "type": "",
      "amount": 0,
      "MSA": 0,
      "economicAlocation": 1,
    };
  }

  createNewItemFromExcel(factorName:string, category: string, subCategory: string,MSA: number,percentage: number){
    this.itemInfo.id=this.id;
    this.name =  factorName;
    this.impactArea = category;
    this.type = subCategory;
    this.msa = MSA;
    this.amount = percentage;
    this.setNewFootprintType(this.impactArea);
    this.resultChanged();
  }

  //if item is being copied use cpy data for this item
  ngOnInit() {
    console.log("Vthis.cpyData",this.cpyData);
    if (this.cpyData) {
      this.name = this.cpyData.name;
      this.amount = this.cpyData.amount;
      this.impactArea = this.cpyData.impactArea;
      this.setNewFootprintType(this.impactArea);
      if(this.cpyData.extraInput){
        this.showExtraInput = true;
        this.other = this.cpyData.extraInput;
      }else{
        this.res["" + this.impactArea + ""].forEach((element: any) => {
          if (Object.keys(element)[0] == this.type) {
            this.itemInfo.MSA = element[this.type];
            this.msa = element[this.type];
          }
        });
      }
      this.type = this.cpyData.type;
      this.economicAlocation = this.cpyData.economicAlocation;
      this.itemInfo.id = this.id;
      this.itemInfo.name = this.name;
      this.itemInfo.impactArea = this.impactArea;
      this.itemInfo.type = this.type;
      this.itemInfo.amount = this.amount;
      this.itemInfo.economicAlocation = this.economicAlocation;


      this.resultChanged();
    } else {
      this.setNewFootprintType(this.footprintTypes[0]);
    }
  }
  
  onChangeFootPrintType(event: any) {
    this.setNewFootprintType(event.target.value);
  }

  //set item 's impact area and change other input fields accordingly
  setNewFootprintType(type: string) {
    console.log(this.res);
    this.impactArea = type;
    this.type = Object.keys(this.res["" + type + ""][0])[0];
    let a: string[] = [];

    if(this.impactArea.includes("Land")){

      this.placeholderValue = "Enter quantity (ha)";
    }
    if(this.impactArea.includes("Green")){

      this.placeholderValue = "Enter quantity";
    }

    this.res["" + type + ""].forEach((element: any) => {
      a.push(String(Object.keys(element)));
    });
    this.selectedFTypes = a;
    this.showExtra(a[0][0]);
  }

  //enable extra to be shown if necessary
  showExtra(event: any) {
    const chage = event;//.target.split(',')[1]
    if (!this.cpyData) {
      this.itemInfo.type = chage;
    }
    this.res["" + this.impactArea + ""].forEach((element: any) => {
      if (Object.keys(element)[0] == chage && !this.cpyData) {
        this.itemInfo.MSA = element[chage];
        this.msa = element[chage];
      }
    });

    if (chage === "Other") {
      this.showExtraInput = true;
    } else {
      this.showExtraInput = false;
    }
    this.resultChanged();
  }

  //set item name and notify that result has changed
  setItemName(event: any) {
    this.name = event.target.value;
    this.itemInfo.name = event.target.value;
    this.resultChanged();
  }

  //set item amount and notify that result has changed
  setItemAmount(event: any) {
    const amount = event.target.value;
    this.amount = amount;
    this.itemInfo.amount = amount;
    this.resultChanged();
  }

  //set item economic allocation and notify that result has changed
  setItemEconomicAlocation(event: any){
    const economicAlocation:number = event.target.value;
    this.economicAlocation = economicAlocation;
    this.itemInfo.economicAlocation = economicAlocation;
    this.resultChanged();
  }

  //set item msa and notify that result has changed
  setExtraMSA(msa: number) {
    this.itemInfo.MSA = msa;
    this.msa = msa;
    this.resultChanged();
  }
  //notify that result has changed
  resultChanged() {
    this.getMsa();
    this.itemInfo.id = this.id;
    this.itemInfo.name = this.name;
    this.itemInfo.impactArea = this.impactArea;
    this.itemInfo.type = this.type;
    if(!this.showExtraInput){
      this.itemInfo.MSA = this.msa;
    }else{
      this.itemInfo.MSA = this.other;
    }
    this.itemInfo.economicAlocation = this.economicAlocation;
    this.changesEvent.emit(this.itemInfo);
  }

  //delete the item
  deleteItem() {
    this.state = "out";
    this.deleteItemOutput.emit(this.id);
  }

  //get msa of the item
  getMsa() {
    this.res["" + this.impactArea + ""].forEach((element: any) => {
      if (Object.keys(element)[0] == this.type) {
        this.msa = element[this.type]
      }
    });
  }

  //get data of the item
  getData() {
    let extraInput = this.other;
    if(!this.showExtraInput){
      extraInput = 0;
    }
    return {
      name: this.name,
      impactArea: this.impactArea,
      type: this.type,
      extraInput,
      amount: this.amount,
      economicAlocation: this.economicAlocation
    };
  }
}
