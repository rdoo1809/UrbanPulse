import {Occasion} from "./occasion.model";


export class List {
  id: number | undefined;
  public userID: number | undefined;
  public eventID: number| undefined;


  print(){
    console.log(`id: ${this.id} \nUserID: ${this.userID} \nEvent ID: ${this.eventID}`);
  }
}
