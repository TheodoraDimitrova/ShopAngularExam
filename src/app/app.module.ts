import { environment } from "../environments/environment"
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { BsNavbarComponent } from "./components/bs-navbar/bs-navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { ShoppingCardComponent } from "./components/shopping-card/shopping-card.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { AdminProductsComponent } from "./components/admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./components/admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./components/login/login.component";



import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCardComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    AngularFireAuthModule,
    RouterModule.forRoot([
      //anonymousUsers
      { path: "", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "products", component: ProductsComponent },
      { path: "shopping-card", component: ShoppingCardComponent },

      //login users
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "order-success",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },

      //admin routes
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService]
      }
    ]),
    NgbModule.forRoot()
  ],
  providers: [AuthService, AuthGuardService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
