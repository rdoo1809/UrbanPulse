export class Occasion{
  id: number | undefined;
  public title: string = "";
  public organiser: string = "";
  public type: string ="";
  public price: number = 0;
  public comments: string = "";
  public address: string = "";
  public date: Date = new Date();
  public isSaved: Boolean = false;
  public coords: string = "";
  //image as well
  public image: String = "../../assets/images/bg-home.png";

  //
  print(){
    console.log(`Title: ${this.title} \nOrganiser: ${this.organiser} \nGenre: ${this.type} \nPrice: ${this.price} \nComment: ${this.comments}`);
  }
}
