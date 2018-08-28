import { environment } from "../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from 'ngx-custom-validators';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from "./app.component";
import { BsNavbarComponent } from "./components/bs-navbar/bs-navbar.component";
import { ProductsComponent } from "./components/products/products.component";
import { ShoppingCardComponent } from "./components/shopping-card/shopping-card.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { AdminProductsComponent } from "./components/admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./components/admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./components/login/login.component";
import { ProductFormComponent } from "./components/admin/product-form/product-form.component";
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { CategoryService } from "./services/category.service";

import { AdminAuthGuard } from "./services/admin-auth-guard.service";
import { AuthGuardService } from "./guards/auth-guard.service";
import { ProductService } from "./services/product.service";
import { ShoppingCartService } from "./services/shopping-cart.service";


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ProductsComponent,
    ShoppingCardComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    RegisterComponent
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    AngularFireAuthModule,
    HttpClientModule,
    
    RouterModule.forRoot([
      //anonymousUsers
      { path: "", component: ProductsComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
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
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      },
      {
        path: "admin/products/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      },
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      },
      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuard]
      }
    ]),
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
