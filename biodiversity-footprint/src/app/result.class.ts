export class Result {

    msa:number;
    name:string;
    category:string;
    subCategory:string;
    scenarioTitle: string;
    area: string;
    percentage: any;
    

    constructor(name:string, category:string, subCategory:string, msa:number, scenarioTitle: string, area: string) {
      this.name = name;
      this.subCategory = subCategory;
      this.category = category;
      this.msa = msa;
      this.scenarioTitle = scenarioTitle;
      this.area = area;
    }

    getScenarioTitle(){
      return this.scenarioTitle;
    }
    setScenarioTitle(scenarioTitle:string){
      this.scenarioTitle = scenarioTitle;
    }
    getName(){
      return this.name;
    }
    getCategory(){
      return this.category;
    }
    getMsa(){
      return this.msa;
    }
    setName(name:string){
      this.name = name;
    }
    setCategory(category: string){
      this.category = category;
    }
    setMsa(msa:number){
      this.msa = msa;
    }
  }

  // export { Result };


