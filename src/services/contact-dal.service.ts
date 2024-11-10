import {inject, Injectable} from '@angular/core';
import {Contact} from "../models/contact";
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class ContactDalService {

  database = inject(DatabaseService);


  constructor() { }


  //C
  insert(contact: Contact): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["contacts"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const contactStore = transaction.objectStore("contacts");
      const req = contactStore.add(contact);

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
  selectAll(): Promise<Contact[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["contacts"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const contactStore = transaction.objectStore("contacts");

      const req = contactStore.getAll();
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
      const transaction = this.database.db.transaction(["contacts"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const contactStore = transaction.objectStore("contacts");

      const req = contactStore.get(id);
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
  update(contact: Contact): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["contacts"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const contactStore = transaction.objectStore("contacts");

      const reqUpdate = contactStore.put(contact);

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
  delete(contact: Contact): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["contacts"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const contactStore = transaction.objectStore("contacts");
      if (contact.id) {
        const reqDelete = contactStore.delete(contact.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("Contact does not have id")
      }
    });
  }

  //D all
  deleteAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["contacts"], "readwrite"); //by default readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: DELETE ALL successful");
      }
      transaction.onerror = () => console.log("Error: DELETE All failed :");

      const contactStore = transaction.objectStore("contacts");

      const req = contactStore.clear();
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
