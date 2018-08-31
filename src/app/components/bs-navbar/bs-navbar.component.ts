import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AppUser } from "../../models/app-user";
import { Router } from "@angular/router";


@Component({
  selector: "app-bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser
  constructor(private auth: AuthService, private router:Router) {
   
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser)


  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
