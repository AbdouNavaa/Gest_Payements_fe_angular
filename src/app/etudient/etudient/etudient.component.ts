import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-etudient',
  templateUrl: './etudient.component.html',
  styleUrls: ['./etudient.component.css']
})
export class EtudientComponent {
  constructor(private service: AuthService) {
    this.service.getEtudients().subscribe(resp => {
      this.eludientdata = resp;
    })
  }
  eludientdata:any
}
