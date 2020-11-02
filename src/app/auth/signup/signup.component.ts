import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { firebaseConfig } from '../../../environments/environment';
import { Router } from '@angular/router';
import { WindowService } from '../../services/window.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
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
    this.contactMessage = '';
    this.isResendOTP = true;
    var appVerifier = this.windowRef.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(`+91${this.contactNumber}`, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        let seconds = 10;
        let timer = setInterval(() => {
          document.getElementById('timer').innerHTML =
            'Re-send OTP ' + seconds + 's ';
          console.log('isResendOTP', this.isResendOTP);
          if (seconds < 1) {
            this.isResendOTP = false;
            console.log('isResendOTP', this.isResendOTP);
            clearInterval(timer);
          }
          seconds--;
        }, 1000);
      })
      .catch((error) => {
        this.contactMessage = error.message;
        console.log('this is error: ', error);
      });
  }
  verfiyOTP() {
    this.windowRef.confirmationResult
      .confirm(this.varificationcode)
      .then((result) => {
        // var credential = firebase.auth.PhoneAuthProvider.credential(
        //   this.windowRef.confirmationResult.verificationId,
        //   `${this.varificationcode}`
        // );
        // firebase.auth().signInWithCredential(credential);
        // this.router.navigate(['']);
        console.log('done');
      })
      .catch((error) => {
        this.message = error.message;
      });
  }

  ReSendOTP() {
    console.log('called');
    this.windowRef.grecaptcha.reset(this.windowRef.recaptchaWidgetId);
    this.SendOTP();
  }
}
