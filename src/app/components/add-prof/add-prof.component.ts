import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfService} from "../../service/prof.service";

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
})
export class AddProfComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: ProfService
  ) {
    this.bookForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      tel: [''],
      Banque: [''],
      Compte: [''],
    })
  }

  ngOnInit() { }

  onSubmit(): any {
    this.crudService.AddProf(this.bookForm.value)
      .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/profs-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
