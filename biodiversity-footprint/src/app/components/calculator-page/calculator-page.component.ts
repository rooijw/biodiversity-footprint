import { Component, OnInit, ElementRef, ViewChildren, ContentChildren, QueryList, ChangeDetectorRef, ViewChild} from '@angular/core';
import { ScenarioComponent } from '../../scenario/scenario.component';
import { Result } from '../../result.class';
//import * as TableToExcel from 'table-to-excel';
import * as XLSX from 'xlsx';
//import from 'xlsx-to-json';


import { GraphsComponent } from '../../graphs/graphs.component';

@Component({
  selector: 'app-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.css'],


})

export class CalculatorPageComponent implements OnInit {
  
  @ViewChildren(ScenarioComponent) scenarios: QueryList<ScenarioComponent> = new QueryList;
  @ContentChildren(ScenarioComponent) scenariosContent: QueryList<ScenarioComponent> = new QueryList;
  @ViewChildren(GraphsComponent) graphs: QueryList<GraphsComponent> = new QueryList;
  addedScenarios: ScenarioComponent[] = []; //array with items
  coppiedScenarios = 0;
  cpyArr: any[] = [undefined];
  allResults: Result[][] = [];
  flattenedArray: Result[] = [];

  biodiversitySumPerScenario: any[] = [];

  scenariosReference: QueryList<ScenarioComponent> = new QueryList;

  @ViewChild('collapseContainer') collapseContainer: ElementRef;
  @ViewChild('collapseButton') collapseButton: ElementRef;
  @ViewChild('collapseContainerLandUse') collapseContainerLandUse: ElementRef;
  @ViewChild('collapseButtonLandUse') collapseButtonLandUse: ElementRef;
  @ViewChild('collapseContainerGHG') collapseContainerGHG: ElementRef;
  @ViewChild('collapseButtonGHG') collapseButtonGHG: ElementRef;
  @ViewChild('collapseContainerTransport') collapseContainerTransport: ElementRef;
  @ViewChild('collapseButtonTransport') collapseButtonTransport: ElementRef;
  @ViewChild('collapseContainerEconomicAllocation') collapseContainerEconomicAllocation: ElementRef;
  @ViewChild('collapseButtonEconomicAllocation') collapseButtonEconomicAllocation: ElementRef;


  constructor(private cd: ChangeDetectorRef) {
    let newItem = new ScenarioComponent;
    this.addedScenarios.push(newItem);
    
  }

  ngOnInit() {
  }

  download($event: any, id: number) {
  }
  //exports the table with certain id
  // TODO: ombouwen zie voorbeeld hieronder
  //download($event: any, id: number) {
    //var tableToExcel = new TableToExcel();
    //tableToExcel.render("resultTable" + id);
  //}

  // exportexcel(): void
  // {
  //   /* pass here the table id */
  //   let element = document.getElementById('excel-table');
  //   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */  
  //   XLSX.writeFile(wb, this.fileName);

  // }

  ngAfterViewInit() {
    this.cd.detectChanges(); 
  }

  //collapses or shows how to container
  public collapseHowTo() {
    if (this.collapseContainer.nativeElement.classList.contains('show')) {
      this.collapseButton.nativeElement.style.transform = 'rotate(0deg)';
      this.collapseContainer.nativeElement.classList.remove('show');
      this.collapseContainer.nativeElement.classList.add('collapse');
    } else {
      this.collapseButton.nativeElement.style.transform = 'rotate(180deg)';
      this.collapseContainer.nativeElement.classList.remove('collapse');
      this.collapseContainer.nativeElement.classList.add('show');
    }
  }

  //collapses or shows how to land use container
  public collapseLandUse() {
    if (this.collapseContainerLandUse.nativeElement.classList.contains('show')) {
      this.collapseButtonLandUse.nativeElement.style.transform = 'rotate(0deg)';
      this.collapseContainerLandUse.nativeElement.classList.remove('show');
      this.collapseContainerLandUse.nativeElement.classList.add('collapse');
    } else {
      this.collapseButtonLandUse.nativeElement.style.transform = 'rotate(180deg)';
      this.collapseContainerLandUse.nativeElement.classList.remove('collapse');
      this.collapseContainerLandUse.nativeElement.classList.add('show');
    }
  }

  //collapses or shows how to GHG container
  public collapseGHG() {
    if (this.collapseContainerGHG.nativeElement.classList.contains('show')) {
      this.collapseButtonGHG.nativeElement.style.transform = 'rotate(0deg)';
      this.collapseContainerGHG.nativeElement.classList.remove('show');
      this.collapseContainerGHG.nativeElement.classList.add('collapse');
    } else {
      this.collapseButtonGHG.nativeElement.style.transform = 'rotate(180deg)';
      this.collapseContainerGHG.nativeElement.classList.remove('collapse');
      this.collapseContainerGHG.nativeElement.classList.add('show');
    }
  }

  //collapses or shows how to transport container
  public collapseTransport() {
    if (this.collapseContainerTransport.nativeElement.classList.contains('show')) {
      this.collapseButtonTransport.nativeElement.style.transform = 'rotate(0deg)';
      this.collapseContainerTransport.nativeElement.classList.remove('show');
      this.collapseContainerTransport.nativeElement.classList.add('collapse');
    } else {
      this.collapseButtonTransport.nativeElement.style.transform = 'rotate(180deg)';
      this.collapseContainerTransport.nativeElement.classList.remove('collapse');
      this.collapseContainerTransport.nativeElement.classList.add('show');
    }
  }

  //collapses or shows how to economic allocation container
  public collapseEconomicAllocation() {
    if (this.collapseContainerEconomicAllocation.nativeElement.classList.contains('show')) {
      this.collapseButtonEconomicAllocation.nativeElement.style.transform = 'rotate(0deg)';
      this.collapseContainerEconomicAllocation.nativeElement.classList.remove('show');
      this.collapseContainerEconomicAllocation.nativeElement.classList.add('collapse');
    } else {
      this.collapseButtonEconomicAllocation.nativeElement.style.transform = 'rotate(180deg)';
      this.collapseContainerEconomicAllocation.nativeElement.classList.remove('collapse');
      this.collapseContainerEconomicAllocation.nativeElement.classList.add('show');
    }
  }

  //deletes scenario that has id of $event
  public deleteScenario($event: any) {
    if (this.scenarios.length === 1) {

    } else {
      //wait for 1.5 seconds so animation can play out
      setTimeout(() => {

        //deletes all results and scenarios that have this scenario id
        this.addedScenarios.splice($event, 1);
        this.cpyArr.splice($event, 1);
        this.allResults.splice($event, 1);

        this.flattenedArray = [];

        //combine all results from allResults 2d array
        for (let i = 0; i < this.allResults.length; i++) {
          this.flattenedArray = this.flattenedArray.concat(this.allResults[i]);
        }

        //update graph with flattened array
        if (this.graphs !== undefined) {
          this.graphs.first.updateGraph(this.flattenedArray);
        }
      }, 1500);
    }
  }

  //adds new scenario
  public onAddScenario($event1: any) {
    let newItem = new ScenarioComponent;
    this.addedScenarios.push(newItem);
    this.cpyArr.push(undefined);
  }

  //updates graph with new results
  public updateGraphs($event: any, index: number) {
    this.allResults[index] = [];
    this.addedScenarios[index].title = $event[0].title;
    this.biodiversitySumPerScenario[index] = 0;

    //calculate sum of biodiversity per scenario to calculate percentages for table 
    for (let i = 0; i < $event.length; i++) {
      this.biodiversitySumPerScenario[index] = this.biodiversitySumPerScenario[index] + $event[i].msa;
    }

    //calculate the percentage of biodiversity factor per scenario
    for (let i = 0; i < $event.length; i++) {
      if (this.biodiversitySumPerScenario[index] <= 0) {
        $event[i].percentage = "undefined";
      } else {
        $event[i].percentage = Math.round(($event[i].msa / this.biodiversitySumPerScenario[index] * 100 + 0.00001) * 100) / 100;
      }
    }

    this.allResults[index] = $event;
    this.flattenedArray = [];

    //combine all results from allResults 2d array
    for (let i = 0; i < this.allResults.length; i++) {
      this.flattenedArray = this.flattenedArray.concat(this.allResults[i]);
    }

    //update graph with flattened array
    if (this.graphs && this.graphs.first) {
      this.graphs.first.updateGraph(this.flattenedArray);
    }
  }

  //filter results for land use items
  public filterGraphLandUse() {
    this.filterGraph("Land use", "category");
  }

  //filter results for GHG items
  public filterGraphGHG() {
    this.filterGraph("Green house gas", "category");

  }

  //filter results for transport items
  public filterGraphTransport() {
    this.filterGraph("Transport", "category");
  }

  //filter results for supply chain items
  public filterGraphSupplyChain() {
    this.filterGraph("supply chain", "area");
  }

  //filter results for production site items
  public filterGraphProdSite() {
    this.filterGraph("production site", "area");
  }

  //show all results
  public filterGraphReset() {
    if (this.graphs !== undefined) {
      this.graphs.first.updateGraph(this.flattenedArray);
    }
  }

  //update graph with results that have matching filterString and area
  public filterGraph(filterString: string, area: string) {
    let filteredResults: Result[] = [];

    if (area == "area") {
      for (let i = 0; i < this.flattenedArray.length; i++) {
        if (this.flattenedArray[i].area == filterString) {
          filteredResults.push(this.flattenedArray[i]);
        }
      }
    } else if (area == "category") {
      for (let i = 0; i < this.flattenedArray.length; i++) {
        if (this.flattenedArray[i].category == filterString) {
          filteredResults.push(this.flattenedArray[i]);
        }
      }
    }

    //update graph
    if (this.graphs !== undefined) {
      this.graphs.first.updateGraph(filteredResults);
    }
  }

  //create new copied scenario
  cpyEvent($event: any) {
    this.cpyArr.push($event);
    this.addedScenarios.push(new ScenarioComponent);
  }

  //sort table alphabetically
  sortTable(n: number) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("resultTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      if (table) {
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
  }

  //sort table numerically
  sortTableNumerical(n: number) {
    var table, rows, switching, i, x, y, shouldSwitch, switchCount = 0;
    table = document.getElementById("resultTable");
    switching = true;
    var dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching && table) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        //check if the two rows should switch place:
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchCount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

}

