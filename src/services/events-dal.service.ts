import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Occasion} from "../models/occasion.model";

@Injectable({
  providedIn: 'root'
})
export class EventsDalService {
  database = inject(DatabaseService);

  constructor() {
  }

  //C
  insert(occasion: Occasion): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");
      const req = eventStore.add(occasion);

      req.onsuccess = (event: any) => {
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
  selectAll(): Promise<Occasion[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");

      const req = eventStore.getAll();
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
      const transaction = this.database.db.transaction(["events"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");

      const req = eventStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  //-------below dependant on if current user is organiser
  //U
  update(occasion: Occasion): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");

      const reqUpdate = eventStore.put(occasion);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }


  //D one
  delete(occasion: Occasion): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const eventStore = transaction.objectStore("events");
      if (occasion.id) {
        const reqDelete = eventStore.delete(occasion.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("Event does not have id")
      }
    });
  }

  //D all
  deleteAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite"); //by default readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: DELETE ALL successful");
      }
      transaction.onerror = () => console.log("Error: DELETE All failed :");

      const eventStore = transaction.objectStore("events");

      const req = eventStore.clear();
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


  //end of class
}
