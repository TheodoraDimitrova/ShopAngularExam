import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  register() {
    const email=this.model.email
    const password=this.model.password
    this.auth.register(email,password)
  }
}
