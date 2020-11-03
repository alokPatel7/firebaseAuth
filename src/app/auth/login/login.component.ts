import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/services/window.service';
import firebase from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../signup/signup.component.css'],
})
export class LoginComponent implements OnInit {
  windowRef: any;
  emailid: string;
  password: String;
  varificationcode: Number;
  errorMessage = '';
  contactNumber;

  constructor(
    private win: WindowService,
    private fbAuth: AngularFireAuth,
    private router: Router
  ) {
    this.windowRef = this.win.windowRef;
  }

  ngOnInit(): void {
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(firebaseConfig);
    // }
  }

  // ngAfterViewInit() {
  //   this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     'recaptchacontainer',
  //     {
  //       size: 'normal',
  //       callback: function (response) {},
  //       'expired-callback': function () {},
  //     }
  //   );
  //   this.windowRef.recaptchaVerifier.render().then(function (widgetId) {
  //     this.windowRef.recaptchaWidgetId = widgetId;
  //   });
  // }

  onSubmit() {
    console.log('details ', `${this.emailid}`, `${this.password}`);

    firebase
      .auth()
      .signInWithEmailAndPassword(`${this.emailid}`, `${this.password}`)
      .then((result) => {
        (this.emailid = ''), (this.password = '');

        console.log('result', result);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.log('errors', error.code, error.message);
      });
  }

  loginbyNumber = true;
  loginbyemail = false;
  emailLogin() {
    this.loginbyemail = true;
    this.loginbyNumber = false;
  }

  mobileLogin() {
    this.ngOnInit();
    // this.ngAfterViewInit();
    this.loginbyemail = false;
    this.loginbyNumber = true;
  }

  handleLoginViaMobileNumbe() {
    console.log('number   ', this.contactNumber);

    firebase
      .auth()
      .signInWithCredential(this.contactNumber)
      .then((result) => {
        console.log('redult', result);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  forgotPassword() {
    console.log(' forgot called');

    // var actionCodeSettings = {
    //   url: 'https://authbynumber.firebaseapp.com',
    //   iOS: {
    //     bundleId: 'com.example.ios',
    //   },
    //   android: {
    //     packageName: 'com.example.android',
    //     installApp: true,
    //     minimumVersion: '12',
    //   },
    //   handleCodeInApp: true,
    // };
    firebase
      .auth()
      .sendPasswordResetEmail('eadvp9@gmail.com')
      .then(() => {
        // Password reset email sent.
        console.log('link send ');
      })
      .catch((error) => {
        console.log('link not send ', error);
        // Error occurred. Inspect error.code.
      });
  }
}
