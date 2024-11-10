export class User {
  id: number | undefined;
  public fullName: string ="";
  public email: string = "";
  public password: string = "";

  print(){
    console.log(`ID: ${this.id} \nFullname :${this.fullName} \nEmail: ${this.email} \n Password: ${this.password} `);
  }
  // constructor(email: string = '', password: string = '') {
  //   this.email = email;
  //   this.password = password;
  // }
}
