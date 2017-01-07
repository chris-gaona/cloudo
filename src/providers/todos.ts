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

  }

  createTodo(todo) {

  }

  updateTodo(todo) {

  }

  deleteTodo(todo) {

  }

  handleChange(change) {

  }
}
