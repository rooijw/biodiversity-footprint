import { Component, Input, OnInit, QueryList } from '@angular/core';
import { Result } from '../../app/result.class';
import Chart from 'chart.js/auto';
import { SubCategory } from '../../app/subCategory';
import GraphToPdf from 'jspdf';
import { ScenarioComponent } from '../scenario/scenario.component';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})

export class GraphsComponent implements OnInit {
  ctx: any;
  chartType = 'bar';
  myChart: any;
  data: any;
  options = {};
  //colors to be used in land use
  landUseColors = ["#293B8D", "#66AF44", "#3F92BE", "#A8B7D6", "#B4DCB9", "21306B", "#387D3E", "#237A96", "#B4DCB9", "#2E2D73"];
  //colors to be used in GHG
  gasImpactColors = ["#F04639", "#FFEF41", "#A0429A", "#C02834", "#D4CF2B", "#DE5B25", "#F379AA", "#FEC983", "#FED7AC", "#F78E3B"];
  //colors to be used in transport
  transportColors = ["#191919", "#999999", "#323232", "#b2b2b2", "#4c4c4c", "#cccccc", "#665666" ,"#e5e5e5", "#7f7f7f", "#000000"];

  @Input() scenarios: QueryList<ScenarioComponent> 

  constructor() {
  }

  //Initially create Charts
  ngOnInit() {
    this.ctx = document.getElementById("myChart");
    // Global Options:
    Chart.defaults.color = 'grey';
    this.options = {
      title: {
        display: true,
        position: 'top',
        fontSize: 23,
        fontStyle: 'bold',
        fontFamily: 'Helvetica Neue',
        text: 'Biodiversity footprint'
      },
      scales: {
        x: {
          scaleLabel: {
            display: true,
            fontSize: 18,
            labelString: 'Scenarios'
          },
          stacked: true
        },
        y: {
          scaleLabel: {
            display: true,
            fontSize: 18,
            labelString: 'Biodiversity impact (MSA.ha)'
          },
          ticks: {
            beginAtZero: true
          },
          stacked: true
        }
      }
    };

    //this.initChart();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scenarios.toArray();
    });
  }
  initChart(data: any) {
    // Chart declaration:
    if (this.myChart) {
      this.myChart.destroy();
    }
    this.myChart= new Chart (this.ctx, 
    { type: 'bar',
      data,
      options: this.options
    });


    console.log(this.chartType);
    console.log(this.data);
    console.log(this.options);
  } 

  //update graph with array of results
  updateGraph(results: Result[]) {
    const scenarios: String[] = [];
    const datasets: [{ label: string; data: number[]; backgroundColor: String; }] = [{label: '', data: [0], backgroundColor: ''}];
    const subCategories: SubCategory[] = [];

    let countLandColors = 0;  //land use color to be used
    let countGasColors = 0;   //GHG color to be used
    let countScenarios = 0;   //number of scenarios
    let countTransportColors = 0; //transport color to be used

    for (let i = 0; i < results.length; i++) {
      if (scenarios.indexOf(results[i].scenarioTitle) < 0) { // scenario doesn't exist yet -> create one
        scenarios[countScenarios] = results[i].scenarioTitle; // for x-axis title
        countScenarios++;
       }

      //Add data to each subCategory

      if (subCategories.length > 0) {
        let found = false;

        //look for result name in subcategories
        for (let j = 0 ; j < subCategories.length ; j++){
          if (results[i].name == subCategories[j].name){

            //look if any scenario name matches with the scenario title of the result
            for(let k = 0; k < scenarios.length; k++){
              //if found add data to subCategory
              if(scenarios[k] == results[i].scenarioTitle){
                subCategories[j].addData(results[i].msa, k);
                found = true;
              }
            }
          }
        }
        if(!found) {
          console.log(results[i])
          //if result category is land use create new category for land use, add data to it and push it into subCategories
          if (results[i].category == 'Land use'){
            var newSubCat = new SubCategory(results[i].name,this.landUseColors[countLandColors]);
            for(let k = 0; k < scenarios.length; k++){
              if(scenarios[k] == results[i].scenarioTitle){
                newSubCat.addData(results[i].msa, k);
              }
            }
            subCategories.push(newSubCat);
            //use next land use color
            countLandColors++;
          //if result category is GHG create new category for GHG, add data to it and push it into subCategories
          } else if (results[i].category == 'Green house gas'){
            var newSubCat = new SubCategory(results[i].name,this.gasImpactColors[countGasColors]);
            for(let k = 0; k < scenarios.length; k++){
              if(scenarios[k] == results[i].scenarioTitle){
                newSubCat.addData(results[i].msa, k);
              }
            }
            subCategories.push(newSubCat);
            //use next gas color
            countGasColors++;
          //if result category is transport create new category for transport, add data to it and push it into subCategories
          } else {
            var newSubCat = new SubCategory(results[i].name,this.transportColors[countTransportColors]);
          for(let k = 0; k < scenarios.length; k++){
            if(scenarios[k] == results[i].scenarioTitle){
              newSubCat.addData(results[i].msa, k);
            }
          }
          subCategories.push(newSubCat);
          //use next transport color
          countTransportColors++;
          }
        }
      } else {
        //if result category is land use create new category for land use, add data to it and push it into subCategories
        if (results[i].category == 'Land use'){
          var newSubCat = new SubCategory(results[i].name,this.landUseColors[countLandColors]);
          for(let k = 0; k < scenarios.length; k++){
            if(scenarios[k] == results[i].scenarioTitle){
              newSubCat.addData(results[i].msa, k);
            }
          }
          subCategories.push(newSubCat);
          //use next land use color
          countLandColors++;
        //if result category is GHG create new category for GHG, add data to it and push it into subCategories
        } else if (results[i].category == 'Green house gas') {
          var newSubCat = new SubCategory(results[i].name,this.gasImpactColors[countGasColors]);
          for(let k = 0; k < scenarios.length; k++){
            if(scenarios[k] == results[i].scenarioTitle){
              newSubCat.addData(results[i].msa, k);
            }
          }
          subCategories.push(newSubCat);
          //use next gas color
          countGasColors++;
        //if result category is transport create new category for transport, add data to it and push it into subCategories
        } else {
          var newSubCat = new SubCategory(results[i].name,this.transportColors[countTransportColors]);
          for(let k = 0; k < scenarios.length; k++){
            if(scenarios[k] == results[i].scenarioTitle){
              newSubCat.addData(results[i].msa, k);
            }
          }
          subCategories.push(newSubCat);
          //use next transport color
          countTransportColors++;
        }
      }
    }

    //put data from subCategories to currentResult
    
    for (let j = 0; j < subCategories.length; j++) {
      const currentResult = {
        label: subCategories[j].name,
        data: subCategories[j].getData(),
        backgroundColor: subCategories[j].color
      };
      if(j===0){
        datasets[j] = currentResult;
      } else {
        datasets.push(currentResult)
      }
    }

    const data = {
      labels: scenarios,
      datasets, 
      options: this.options
    };
    this.initChart(data);
  }

  //downloads graph from myChart component with settings described below as a biodiversity_footprint.pdf document
  downloadGraph(){
    var newCanvas = <HTMLCanvasElement> document.getElementById('myChart');
    var newCanvasImg = newCanvas.toDataURL("image/png", 1.0);
    var doc = new GraphToPdf('landscape');
    doc.setFontSize(20);
    doc.setFillColor(0, 0,0,0);
    doc.rect( 10, 10, 280, 150 , "F");
    doc.addImage(newCanvasImg, 'png', 10, 10, 280, 150 );
    doc.save('biodiversity_footprint.pdf');
  }
}
