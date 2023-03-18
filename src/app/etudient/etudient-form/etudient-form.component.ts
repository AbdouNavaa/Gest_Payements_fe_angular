import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Etudient } from 'src/models/etudient';

@Component({
  selector: 'app-etudient-form',
  templateUrl: './etudient-form.component.html',
  styleUrls: ['./etudient-form.component.css'],
})
export class EtudientFormComponent {
  model = new Etudient();

  Niveau: string[] = ['Licence', 'Master'];
  faculites: string[] = [
    'Faculté des Sciences et Techniques',
    'Faculté de Médecine ',
    'Faculté des Sciences Juridiques et Economiques',
    'Faculté des Lettres et des Sciences Humaines',
    'Institut Universitaire Professionnel',
  ];
  instituts: string[] = [
    ' Institut Supérieur d’Enseignement Technologique de ROSSO',
    'Centre National des Œuvres Universitaires',
    'Institut Supérieur des Etudes et des Recherches Islamiques',
    'Institut Supérieur d`Anglais',
    'Institut Supérieur Professionnel des Langues, de Traduction et d`Interprétariat',
    ' Institut Supérieur du Numérique',
    'Institut Supérieur de Comptabilité et d’Administration des Entreprises(ISCAE)',
  ];
  constructor(private builder: FormBuilder, private http: HttpClient) {}
  onSubmit(form: any) {
    console.log(form.value);
  }
  isLinear = true;

  ngOnInit(): void {}
  RegisterEtudient = this.builder.group({
    person: this.builder.group({
      nom: this.builder.control('', Validators.required),
      prenom: this.builder.control('', Validators.required),
      INE: this.builder.control('', Validators.required),
      date_naissance: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.required),
    }),
    etude: this.builder.group({
      etablisement: this.builder.control('', Validators.required),
      niveau: this.builder.control('', Validators.required),
      numero_immatriculation: this.builder.control('', Validators.required),
    }),

    contact: this.builder.group({}),
  });
  get personForm() {
    return this.RegisterEtudient.get('person') as FormGroup;
  }

  get etudeForm() {
    return this.RegisterEtudient.get('etude') as FormGroup;
  }
  get contactForm() {
    return this.RegisterEtudient.get('contact') as FormGroup;
  }

  addEtudient() {
    if (this.RegisterEtudient.valid) {
      console.log(this.RegisterEtudient.value);
    }
  }
  register() {
    let data = {
      ine: this.RegisterEtudient.value.person?.INE,
      nom: this.RegisterEtudient.value.person?.nom,
      prenom: this.RegisterEtudient.value.person?.prenom,
      dateNaissance: this.RegisterEtudient.value.person?.date_naissance,
      email: this.RegisterEtudient.value.person?.email,
      numeroImmatriculation:
        this.RegisterEtudient.value.etude?.numero_immatriculation,
      niveau: this.RegisterEtudient.value.etude?.niveau,
      etablisement: this.RegisterEtudient.value.etude?.etablisement,
      fkElection: 1,
    };
    this.http
      .post('http://localhost:8080/election/public/etudient/add', data)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Etudient Registered Successfully');
      });
  }
  save() {
    this.register();
  }
  onSubmit1() {}
}
export { Etudient };
