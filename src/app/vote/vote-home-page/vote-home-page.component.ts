import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote-home-page',
  templateUrl: './vote-home-page.component.html',
  styleUrls: ['./vote-home-page.component.css'],
})
export class VoteHomePageComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  onSubmit(form: any) {
    console.log(form.value);
  }
  isLinear = true;

  ngOnInit() {}
  form = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
  });

  login() {
    if (this.form.valid) {
      console.log(this.form.value);
      let email = this.form.value.email;
      this.http
        .get(`http://localhost:8080/election/public/vote/get/${email}`)
        .subscribe((resultData: any) => {
          this.router.navigate(['vote/syndicat']);
          //alert('Login Success');
        });
    }
  }
}
