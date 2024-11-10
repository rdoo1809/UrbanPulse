import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {List} from "../models/list.model";
import {Occasion} from "../models/occasion.model";

@Injectable({
  providedIn: 'root'
})
export class ListDalService {
  database = inject(DatabaseService);

  constructor() {  }


  //C
  insert(listItem: List): Promise<any>{
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["list"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const listStore = transaction.objectStore("list");
      const req = listStore.add(listItem);

      req.onsuccess = (event:any) => {
        //returns the key of newly added item
        console.log(`Success: event added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  //R all
  selectAll(): Promise<List[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["list"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const listStore = transaction.objectStore("list");

      const req = listStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  //R one
  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["list"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const listStore = transaction.objectStore("list");

      const req = listStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }


  //D
  delete(eventId: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["list"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const listStore = transaction.objectStore("list");
      if (eventId) {
        const reqDelete = listStore.delete(eventId);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      }
      else{
        reject("Event does not have id")
      }
    });
  }

  //D all
  deleteAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["list"], "readwrite"); //by default readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: DELETE ALL successful");
      }
      transaction.onerror = () => console.log("Error: DELETE All failed :");

      const listStore = transaction.objectStore("list");

      const req = listStore.clear();
      req.onsuccess = (event: any) => {
        console.log("Success: all records DELETED successfully");
        resolve(event);
      }
      req.onerror = (event: any) => {
        console.log("Error: error in DELETION: " + event);
        reject(event);
      }
    });
  }


}
