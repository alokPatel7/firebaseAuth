import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/window.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-email-auth',
  templateUrl: './email-auth.component.html',
  styleUrls: ['./email-auth.component.css', '../signup/signup.component.css'],
})
export class EmailAuthComponent implements OnInit {
  windowRef: any;
  contactNumber: string;
  password: String;
  varificationcode: Number;
  signuperrormsg = '';

  constructor(
    private win: WindowService,
    private fbAuth: AngularFireAuth,
    private router: Router
  ) {
    this.windowRef = this.win.windowRef;
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('details ', `${this.contactNumber}`, `${this.password}`);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        `${this.contactNumber}`,
        `${this.password}`
      )
      .then((result) => {
        (this.contactNumber = ''), (this.password = '');
        console.log('result', result);
      })
      .catch((error) => {
        this.signuperrormsg = error.message;
        console.log('errors', error.code, error.message);
      });
  }
}
