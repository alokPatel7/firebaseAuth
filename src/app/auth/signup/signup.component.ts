import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import firebase from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment';
import { Router } from '@angular/router';
import { WindowService } from '../../services/window.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
// import { auth } from "firebase/auth";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, AfterViewInit {
  windowRef: any;
  contactNumber: Number;
  varificationcode: Number;
  message = '';
  contactMessage = '';
  isResendOTP: boolean = true;

  showSuccessPopupbox: boolean = false;

  constructor(
    private win: WindowService,
    private fbAuth: AngularFireAuth,
    private router: Router
  ) {
    this.windowRef = this.win.windowRef;
  }

  ngOnInit(): void {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  ngAfterViewInit() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptchacontainer',
      {
        size: 'normal',
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      }
    );
    this.windowRef.recaptchaVerifier.render();
  }

  SendOTP() {
    console.log('form data', this.contactNumber);
    var appVerifier = this.windowRef.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(`+91${this.contactNumber}`, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        let seconds = 5;
        let timer = setInterval(function () {
          document.getElementById('timer').innerHTML =
            'Re-send OTP ' + seconds + 's ';
          // console.log('isResendOTP', this.isResendOTP);
          if (seconds < 1) {
            // this.isResendOTP = false;
            let btn = <HTMLInputElement>document.getElementById('isResendOTP');
            btn.disabled = false;
            // console.log('isResendOTP', this.isResendOTP);
            clearInterval(timer);
          }
          seconds--;
        }, 1000);
      })
      .catch((error) => {
        this.message = error.message;
        console.log('this is error: ', error);
      });
  }
  verfiyOTP() {
    this.windowRef.confirmationResult
      .confirm(this.varificationcode)
      .then((result) => {
        this.router.navigate(['landing']);
      })
      .catch((error) => {
        this.message = 'Incorrect code entered';
      });
  }
}
