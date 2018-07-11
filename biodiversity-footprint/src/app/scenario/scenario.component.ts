import { Component, OnInit, Output, EventEmitter, Input, ViewChildren, QueryList } from '@angular/core';
import { ItemComponent } from '../items/item/item.component';
import { TransportItemComponent } from '../items/transport-item/transport-item.component'
import { Result } from '../../app/result.class';
import * as $ from 'jquery';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { easeBackInOut, easeBackIn } from 'd3';


@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css'],
  animations: [
    trigger('shrinkOut', [
      state('true', style({ height: 0, opacity: 0 })),
      transition('false => true', [
        style({ opacity: 1 }),
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
      transition('true => hide', [
        style({ height: '*', opacity: 0 }),
        animate(1000, style({ height: 0 }))
      ]),
      transition("void => false", [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class ScenarioComponent implements OnInit {
  @Input() id: number;
  @Input() cpyInfo: any;
  @ViewChildren(ItemComponent) items: QueryList<ItemComponent>;
  @ViewChildren(TransportItemComponent) transportItemsChildren: QueryList<TransportItemComponent>;
  @Output() deleteScenarioOutput = new EventEmitter<number>();
  @Output() sendGraphUpdate = new EventEmitter<any>();
  @Output() cpyEvent = new EventEmitter<any>();
  title: string = "";
  scenarioTitle: string = "";
  productDescription: string = "";
  showSupplyChain: boolean = true;
  showProductionSite: boolean = false;
  showTransport: boolean = false;
  radioButton: number = 1;

  supplyChainCpyItems = [];
  prodSiteCpyItems = [];
  transportCpyItems = [];

  supplyChainTotalFootprint: number; //unit in MSA.ha
  productionSiteTotalFootprint: number;
  transportTotalFootprint: number;
  totalScenarioFootprint: number;

  individualSupplyChainFootprints: Result[] = [];
  individualProductionSiteFootprints: Result[] = [];
  individualTransportFootprints: Result[] = [];

  isCollapsed = false;
  desc = "";

  supplyChainItems: ItemComponent[] = []; //array with items
  productionSiteItems: ItemComponent[] = [];
  transportItems: TransportItemComponent[] = [];

  nrOfItems: number;
  animate = "any";

  //create first item components in this scenario
  constructor() {
    let newItem1 = new ItemComponent;
    this.supplyChainItems.push(newItem1);
    let newItem2 = new ItemComponent;
    this.productionSiteItems.push(newItem2);
    this.transportItems.push(new TransportItemComponent);
  }

  ngOnInit() {
    if (this.id != 0) {
      this.animate = "false";
    }
    //if scenario is being copied fill out new scenario with copy info
    if (this.cpyInfo) {
      this.title = this.cpyInfo.name + "(copy" + this.id + ")";
      this.desc = this.cpyInfo.productDsc;
      this.showSupplyChain = this.cpyInfo.showSupplyChain;
      this.showProductionSite = this.cpyInfo.showProductionSite;
      this.showTransport = this.cpyInfo.showTransport;
      if (this.showProductionSite && this.showSupplyChain) {
        this.radioButton = 4;
      } else if (this.showSupplyChain) {
        this.radioButton = 1;
      } else if (this.showProductionSite) {
        this.radioButton = 2;
      } else {
        this.radioButton = 3;
      }
      this.supplyChainItems = [];
      this.productionSiteItems = [];
      this.transportItems = [];
      this.cpyInfo.supplyChainItems.forEach(element => {
        this.supplyChainCpyItems.push(element);
        this.supplyChainItems.push(new ItemComponent);
      });
      this.cpyInfo.prodSiteItems.forEach(element => {
        this.prodSiteCpyItems.push(element);
        this.productionSiteItems.push(new ItemComponent);
      });

      this.cpyInfo.transportItems.forEach(element => {
        this.transportCpyItems.push(element);
        this.transportItems.push(new TransportItemComponent);
      });

      if (this.productionSiteItems.length == 0) {
        this.productionSiteItems.push(new ItemComponent);
      }
      if (this.supplyChainItems.length == 0) {
        this.supplyChainItems.push(new ItemComponent);
      }
      if (this.transportItems.length == 0) {
        this.transportItems.push(new TransportItemComponent);
      }
    }
  }

  //delete the scenario
  deleteScenario() {
    if (this.id != 0) {
      this.animate = "true";
    }
    this.deleteScenarioOutput.emit(this.id);
    setTimeout(() => { this.animate = "hide" }, 500);
  }

  getId() {
    return this.id;
  }

  //add new supply chain item
  onAddSupplyChainItem($event1) {

    let newItem = new ItemComponent;
    this.supplyChainItems.push(newItem);
    if (this.supplyChainItems.length == 10) {
      $("#add-supp-item-b").prop('disabled', true);
    }
  }

  //add new production site item
  onAddProductionSiteItem($event2) {
    let newItem = new ItemComponent;
    this.productionSiteItems.push(newItem);
    if (this.productionSiteItems.length == 10) {
      $("#add-prod-item-b").prop('disabled', true);
    }
  }

  //add new transport item
  onAddTransportItem($event) {
    this.transportItems.push(new TransportItemComponent);
  }

  //remove production site item
  onRemoveProductionSiteItem($event3) {
    this.productionSiteItems.pop();
  }

  //update scenario title
  updateGraphsOrWE(change) {
    this.scenarioTitle = (change.viewModel);
    this.changeScenarioName();
  }

  //update scenario product description
  updateProductDescription(change) {
    this.productDescription = (change.viewModel);
    this.changeScenarioName();
  }

  //choose between supply chain, prod site, transport or all three by clicking on radio buttons
  radioClick(index: number) {
    if (index === 1) {
      this.showSupplyChain = true;
      this.showProductionSite = false;
      this.showTransport = false;
    } else if (index === 2) {
      this.showSupplyChain = false;
      this.showProductionSite = true;
      this.showTransport = false;
    } else if (index === 3) {
      this.showSupplyChain = false;
      this.showProductionSite = false;
      this.showTransport = true;
    } else {
      this.showSupplyChain = true;
      this.showProductionSite = true;
      this.showTransport = true;
    }
  }

  //receive new item info from supply chain
  receiveItemInfoSupplyChain($event) {

    //if the item is part of land use use formula for land use and create new reuslt with these results
    if ($event.impactArea === "Land use") {

      let msa = 0;
      if ($event.economicAlocation != undefined && $event.economicAlocation != null && $event.economicAlocation != "") {
        let ea: number = $event.economicAlocation;
        if (!($event.economicAlocation <= 10 && $event.economicAlocation >= 0)) {
          ea = 1;
        }
        msa = $event.amount * (1 - $event.MSA) * ea;
      } else {
        msa = $event.amount * (1 - $event.MSA);
      }

      msa = Math.round((msa + 0.00001) * 100) / 100;

      let namee = "";
      if($event.name != ""){
        namee = $event.name + " (lu)";
      }

      let result = new Result(namee, $event.impactArea, $event.type, msa, this.title, "supply chain");
      this.individualSupplyChainFootprints.splice($event.id, 1, result);
    //if the item is part of GHG use formula for GHG and create new reuslt with these results
    } else if ($event.impactArea === "Green house gas") {

      let msa = 0;
      if ($event.economicAlocation != undefined && $event.economicAlocation != null && $event.economicAlocation != "") {
        let ea: number = $event.economicAlocation;
        if (!($event.economicAlocation <= 10 && $event.economicAlocation >= 0)) {
          ea = 1;
        }
        msa = $event.amount * $event.MSA * ea * 0.000032881;
      } else {
        msa = $event.amount * $event.MSA * 0.000032881;
      }

      msa = Math.round((msa + 0.00001) * 100) / 100;

      let namee = "";
      if($event.name != ""){
        namee = $event.name + " (GHG)";
      }
      let result = new Result(namee, $event.impactArea, $event.type, msa, this.title, "supply chain");

      this.individualSupplyChainFootprints.splice($event.id, 1, result);

    }
    //add new copy item to supplyChainCopyItems
    this.supplyChainCpyItems[$event.id] = {
      "name": $event.name,
      "impactArea": $event.impactArea,
      "type": $event.type,
      "amount": $event.amount,
    };
    //decide which results to send to graph
    if (this.showSupplyChain && this.showProductionSite && this.showTransport) {
      var combinedArray = this.individualProductionSiteFootprints.concat(this.individualSupplyChainFootprints);
      combinedArray = combinedArray.concat(this.individualTransportFootprints);
    } else if (this.showSupplyChain) {
      var combinedArray = this.individualSupplyChainFootprints;
    } else if (this.showProductionSite) {
      var combinedArray = this.individualProductionSiteFootprints;
    } else {
      var combinedArray = this.individualTransportFootprints;
    }
    this.sendGraphUpdate.emit(combinedArray);

  }

  //receive new item info from production site
  receiveItemInfoProductionSite($event) {

    //if the item is part of land use use formula for land use and create new reuslt with these results
    if ($event.impactArea === "Land use") {

      let msa = 0;
      if ($event.economicAlocation != undefined && $event.economicAlocation != null && $event.economicAlocation != "") {
        let ea: number = $event.economicAlocation;
        if (!($event.economicAlocation <= 10 && $event.economicAlocation >= 0)) {
          ea = 1;
        }
        msa = $event.amount * (1 - $event.MSA) * ea;
      } else {
        msa = $event.amount * (1 - $event.MSA);
      }

      msa = Math.round((msa + 0.00001) * 100) / 100;

      let namee = "";
      if($event.name != ""){
        namee = $event.name + " (lu)";
      }
      let result = new Result(namee, $event.impactArea, $event.type, msa, this.title, "production site");
      this.individualProductionSiteFootprints.splice($event.id, 1, result);
    //if the item is part of GHG use formula for GHG and create new reuslt with these results
    } else if ($event.impactArea === "Green house gas") {

      let msa = 0;
      if ($event.economicAlocation != undefined && $event.economicAlocation != null && $event.economicAlocation != "") {
        let ea: number = $event.economicAlocation;
        if (!($event.economicAlocation <= 10 && $event.economicAlocation >= 0)) {
          ea = 1;
        }
        msa = $event.amount * $event.MSA * ea * 0.000032881;
      } else {
        msa = $event.amount * $event.MSA* 0.000032881;
      }

      msa = Math.round((msa + 0.00001) * 100) / 100;

      let namee = "";
      if($event.name != ""){
        namee = $event.name + " (GHG)";
      }
      let result = new Result(namee, $event.impactArea, $event.type, msa, this.title, "production site");
      this.individualProductionSiteFootprints.splice($event.id, 1, result);
    }
    //add new copy item to supplyChainCopyItems
    this.prodSiteCpyItems[$event.id] = {
      "name": $event.name,
      "impactArea": $event.impactArea,
      "type": $event.type,
      "amount": $event.amount,
    };
    //decide which results to send to graph
    if (this.showSupplyChain && this.showProductionSite && this.showTransport) {
      var combinedArray = this.individualProductionSiteFootprints.concat(this.individualSupplyChainFootprints);
      combinedArray = combinedArray.concat(this.individualTransportFootprints);
    } else if (this.showSupplyChain) {
      var combinedArray = this.individualSupplyChainFootprints;
    } else if (this.showProductionSite) {
      var combinedArray = this.individualProductionSiteFootprints;
    } else {
      var combinedArray = this.individualTransportFootprints;
    }
    this.sendGraphUpdate.emit(combinedArray);

  }

  //receive new item info from transport and use formula for transport and create new reuslt with these results
  receiveTransportItemInfo($event) {

    let msa = 0;
    if ($event.economicAlocation != undefined && $event.economicAlocation != null && $event.economicAlocation != "") {
      let ea: number = $event.economicAlocation;
      if (!($event.economicAlocation <= 10 && $event.economicAlocation >= 0)) {
        ea = 1;
      }
      msa = ($event.weight * $event.distance) * $event.msa * 0.000032881 * ea; // add /1000 after $event.weight to calculate with kg and turn them into tons for calc
    } else {
      msa = ($event.weight * $event.distance) * $event.msa * 0.000032881; // add /1000 after $event.weight to calculate with kg and turn them into tons for calc
    }
    msa = Math.round((msa + 0.00001) * 100) / 100;

    let namee = "";
      if($event.name != ""){
        namee = $event.name + " (transport)";
      }
    let result = new Result(namee, $event.impactArea, $event.type, msa, this.title, "Transport");
    this.individualTransportFootprints.splice($event.id, 1, result);

    //decide which results to send to graph
    if (this.showSupplyChain && this.showProductionSite && this.showTransport) {
      var combinedArray = this.individualProductionSiteFootprints.concat(this.individualSupplyChainFootprints);
      combinedArray = combinedArray.concat(this.individualTransportFootprints);
    } else if (this.showSupplyChain) {
      var combinedArray = this.individualSupplyChainFootprints;
    } else if (this.showProductionSite) {
      var combinedArray = this.individualProductionSiteFootprints;
    } else {
      var combinedArray = this.individualTransportFootprints;
    }
    this.sendGraphUpdate.emit(combinedArray);
  }

  //delete supply chain item, remove it from results and update graph
  deleteSupplyChainItem($event) {
    setTimeout(() => {
      this.supplyChainItems.splice($event, 1);
      this.individualSupplyChainFootprints.splice($event, 1);
      this.supplyChainCpyItems.splice($event, 1);
      var combinedArray = this.individualProductionSiteFootprints.concat(this.individualSupplyChainFootprints);
      combinedArray = combinedArray.concat(this.individualTransportFootprints);

      this.sendGraphUpdate.emit(combinedArray);
    }, 400);
    $("#add-supp-item-b").prop('disabled', false);
  }

  //delete production site item, remove it from results and update graph
  deleteProductionSiteItem($event) {
    setTimeout(() => {
      this.productionSiteItems.splice($event, 1);
      this.individualProductionSiteFootprints.splice($event, 1);
      this.prodSiteCpyItems.splice($event, 1);
    }, 400);
    var combinedArray = this.individualProductionSiteFootprints.concat(this.individualSupplyChainFootprints);
    combinedArray = combinedArray.concat(this.individualTransportFootprints);

    this.sendGraphUpdate.emit(combinedArray);
    $("#add-prod-item-b").prop('disabled', false);
  }

  //delete tranport item, remove it from results and update graph
  deleteTransportItem($event) {
    setTimeout(() => {
      this.transportItems.splice($event, 1);
      this.individualTransportFootprints.splice($event, 1);
      this.transportCpyItems.splice($event, 1);
      var combinedArray = this.individualProductionSiteFootprints.concat(this.individualSupplyChainFootprints);
      combinedArray = combinedArray.concat(this.individualTransportFootprints);
      this.sendGraphUpdate.emit(combinedArray);
    }, 400);
  }

  //collapse or show the scenario and rotate the button accordingly
  collapseScenario(id) {
    if ($("#collapse-container" + id).hasClass("show")) {
      $(".collapseButton" + id).css({ "transform": "rotate(0deg)" });
      $("#collapse-container" + id).removeClass("collapse show") //.addClass("collapsing");
      // $("#collapse-container"+id).removeClass("collapsing");
      $("#collapse-container" + id).addClass("collapse");
    } else {
      $(".collapseButton" + id).css({ "transform": "rotate(180deg)" });
      $("#collapse-container" + id).removeClass("collapse")//.addClass("collapsing");
      $("#collapse-container" + id).removeClass("collapsing");
      $("#collapse-container" + id).addClass("collapse show");
    }
  }
  /*
    updateGraph() {
      this.sendGraphUpdate.emit(this.individualProductionSiteFootprints);
      this.sendGraphUpdate.emit(this.individualSupplyChainFootprints);
    }*/

  //changes the scenario name, updates results and updates graph
  changeScenarioName() {
    let title;
    if (this.productDescription !== "") {
      title = this.productDescription + " (" + this.scenarioTitle + ")";
    } else {
      title = this.scenarioTitle;
    }
    for (let i = 0; i < this.individualProductionSiteFootprints.length; i++) {
      this.individualProductionSiteFootprints[i].scenarioTitle = title;
    }
    for (let i = 0; i < this.individualSupplyChainFootprints.length; i++) {
      this.individualSupplyChainFootprints[i].scenarioTitle = title;
    }
    for (let i = 0; i < this.individualTransportFootprints.length; i++) {
      this.individualTransportFootprints[i].scenarioTitle = title;
    }

    var combinedArray = this.individualProductionSiteFootprints.concat(this.individualSupplyChainFootprints);
    combinedArray = combinedArray.concat(this.individualTransportFootprints);

    this.sendGraphUpdate.emit(combinedArray);
  }

  //gets data from scenario component
  getData() {
    let result = {};
    result["name"] = $("#scenarioName" + this.id).val();
    result["showSupplyChain"] = this.showSupplyChain;
    result["showProductionSite"] = this.showProductionSite;
    result["showTransport"] = this.showTransport;
    result["productDsc"] = $("#productDescription" + this.id).val();
    let suppItems = [];
    let prodItems = [];
    let transportItems = [];
    this.items.forEach(element => {
      if (element.prodType == "prodSite") {
        prodItems.push(element.getData())
      } else {
        suppItems.push(element.getData());
      }
    });

    this.transportItemsChildren.forEach(item => {
      transportItems.push({
        "prodType": "transport",
        "data": item.getData()
      })
    })

    result["supplyChainItems"] = suppItems;
    result["prodSiteItems"] = prodItems;
    result["transportItems"] = transportItems;
    return result;
  }

  //gets data from an item
  getItemData() {
    let result = [];
    this.items.forEach(item => {
      result.push({
        "prodType": item.prodType,
        "data": item.getData()
      })
    });
    return result;
  }

  //send data from this cenario to cpyEvent
  copyButtonPressed(id: any) {
    this.cpyEvent.emit(this.getData());
  }
}
