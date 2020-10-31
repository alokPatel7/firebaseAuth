import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import firebase from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment';

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
  profileForm = new FormGroup({
    contactNumber: new FormControl(''),
  });
  windowRef: any;
  verificationCode: string;
  user: any;

  constructor(private win: WindowService, private fbAuth: AngularFireAuth) {
    this.windowRef = this.win.windowRef;
  }

  ngOnInit(): void {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  ngAfterViewInit() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptchacontainer'
    );
    this.windowRef.recaptchaVerifier.render();
  }

  verfiInvisibleCapture() {
    console.log('form data', this.profileForm.value);
  }
}
