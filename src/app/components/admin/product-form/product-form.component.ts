import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../../services/category.service";
import { map } from "rxjs/operators";
import { ProductService } from "../../../services/product.service";
import { AppProduct } from "../../../models/app-product";

import { Router } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  model: any = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {}

  save(product: AppProduct) {
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }
}
