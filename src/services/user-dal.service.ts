import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {List} from "../models/list.model";
import {User} from "../models/user.model";
import {Occasion} from "../models/occasion.model";

@Injectable({
  providedIn: 'root'
})
export class UserDalService {
  database = inject(DatabaseService);

  constructor() {  }


  //C
  insert(userItem: User): Promise<any>{
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const userStore = transaction.objectStore("users");
      const req = userStore.add(userItem);

      req.onsuccess = (event:any) => {
        //returns the key of newly added item
        console.log(`Success: user added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  //R
  selectAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"]); // Readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
        console.log("user"+userStore)
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const userStore = transaction.objectStore("users");

      const req = userStore.getAll();
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
      const transaction = this.database.db.transaction(["users"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const userStore = transaction.objectStore("users");

      const req = userStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  //U
  update(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const userStore = transaction.objectStore("users");

      const reqUpdate = userStore.put(user);

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

  //D
  delete(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const userStore = transaction.objectStore("users");
      if (user.id) {
        const reqDelete = userStore.delete(user.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("User does not have id")
      }
    });
  }

  //D all
  deleteAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"], "readwrite"); //by default readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: DELETE ALL successful");
      }
      transaction.onerror = () => console.log("Error: DELETE All failed :");

      const userStore = transaction.objectStore("users");

      const req = userStore.clear();
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
