import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

/*
  Generated class for the Todos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Todos {
  data: any;
  db: any;
  remote: any;

  constructor() {
    this.db = new PouchDB('cloudo');

    this.remote = 'http://localhost:5984/cloudo';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);
  }

  getTodos() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];

        result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  createTodo(todo) {
    this.db.post(todo);
  }

  updateTodo(todo) {
    this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }

  deleteTodo(todo) {
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    // a document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    } else {
      // a document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      } else {
        // a document was added
        this.data.push(change.doc);
      }
    }
  }
}
