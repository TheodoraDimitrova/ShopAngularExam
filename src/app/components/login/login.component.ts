import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  model: any = {};
  constructor(public auth: AuthService) {}

  loginWithGoogle() {
    this.auth.login();
  }

  loginWithEmail() {
    const email=this.model.email;
    const password=this.model.password;
    this.auth.singIn(email,password)
  }
}
