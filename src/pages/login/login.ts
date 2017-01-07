import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Todos } from '../../providers/todos';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public http: Http, public todoService: Todos) {}

  login(){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:3000/auth/login', JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        this.todoService.init(res.json());
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        console.log(err);
      });

  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }
}
