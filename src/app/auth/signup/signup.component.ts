import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Router } from '@angular/router';

import { SignupRequestPayload } from './signup_request_payload';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup | any;
  authService: AuthService|any;
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private router: Router,

  ) {
    this.signupRequestPayload = {
      nom: '',
      email: '',
      password: '',
    };
  }
  onSubmit(form: any) {
    console.log(form.value);
  }
  isLinear = true;

  ngOnInit() {}
  signupForm1 = this.builder.group({
    nom: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
   email: this.builder.control('', [Validators.required, Validators.email]),
    
  });
  signup1() {
    if (this.signupForm1.valid) {
      console.log(this.signupForm1.value);
      let data = {
         nom: this.signupForm1.value.nom,
        email: this.signupForm1.value.email,
        password: this.signupForm1.value.password,
      };
  this.http
        .post('http://localhost:8080/election/public/register', data)
      .subscribe((data :any) => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
      }, (error: any) => {
        console.log(error);

      });
    }

}
  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.nom = this.signupForm.get('nom').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
     
      this.http
        .post('http://localhost:8080/election/register', this.signupRequestPayload)
        .subscribe((resultData: any) => {
          alert('Login Success');
          { queryParams: { registered: 'true' } }
        });

  }
}
