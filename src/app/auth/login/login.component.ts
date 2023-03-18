import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {LocalDbService} from "../local-db.service";
import {UtilService} from "../util.service";
import {AuthService} from "../services/auth.service";
import {ILogin} from "../ILogin";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
   loginForm: FormGroup = <FormGroup>{};
  showError = false;
  constructor(private utilService: UtilService,
              private formBuilder: FormBuilder,
              private localDbService: LocalDbService,
              private authentificationService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this. loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  login() {
    const loginObj: ILogin = {
      email: this. loginForm.value.email,
      password: this. loginForm.value.password
    }
    console.log(loginObj)
    // this.authentificationService.logIn(loginObj).subscribe(data=>console.log("Token: "+data.valueOf));
    this.authentificationService.logIn(loginObj).subscribe(Itoken=>{

      console.log(Itoken);
      const Token = JSON.stringify(Itoken);
      // console.log(Token);
      const tok=JSON.parse(Token);
      const tok2=JSON.parse(tok);
      localStorage.setItem('role', tok2.role);
      // let tokenStr = 'Bearer ' + Itoken.token;

      if(tok2.role=="ADMIN"){
        this.utilService.navigateByUrl('info');
        this.localDbService.token = "Token " + tok2.token;
      }
      if(tok2.role=="USER"){
        this.utilService.navigateByUrl('register');
        this.localDbService.token = "Token " + tok2.token;
      }
      else {
        this.showError = true;
      }
    });

    //console.log(this.authentificationService.logIn(loginObj))
  }





}
