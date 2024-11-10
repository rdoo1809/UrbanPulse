import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  //
  //create database
  //gets called in settings page
  db: any;
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("EventsDB", 1);
      //
      //const aRequest = indexedDB.open("ListDB", 1);


      request.onerror = (event) => {
        console.error("Error in creating database!");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const eventStore = this.db.createObjectStore("events", {
          keyPath: "id",
          autoIncrement: true,
        });
        //
        const listStore = this.db.createObjectStore("list", {
          keyPath: "id",
          autoIncrement: true,
        });
        const userStore = this.db.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: true,
        });
        const contactStore = this.db.createObjectStore("contacts", {
          keyPath: "id",
          autoIncrement: true,
        });
      };
    });
  }

  //
  //init DB
  initDB(){
    this.createDatabase().then((data)=>{
      console.log("Database successfully created " + data);
    }).catch((e)=>{
      console.log("Error in database creation " + e.message());
    });
  }


}
