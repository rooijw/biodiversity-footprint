

export class SubCategory {

  name:string;
  data: number[] = [];
  color:String;


  constructor(name:string, color: String) {
    this.name = name;
    this.color = color;
  }

  getName(){
    return this.name;
  }

  getData(){
    return this.data;
  }

  getColor(){
    return this.color;
  }

  setName(name:string){
    this.name = name;
  }

  setColor(color:String){
    this.color = color;
  }

  addData(newData:number, index:number){
    for(let i = 0; i < index; i++){
      if(this.data[i]==undefined){
        this.data[i] = 0;
      }
    }
    this.data.splice(index, 1, newData);
  }

}
