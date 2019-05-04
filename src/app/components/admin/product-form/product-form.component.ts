import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../../services/category.service";
import { map, take } from "rxjs/operators";
import { ProductService } from "../../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../../../models/app-product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  model: any = {};
  product = {};
  id;
  

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id)
      this.productService
        .getProduct(this.id)
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }

  ngOnInit() {}

  save(product: Product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
      
    }
    this.router.navigate(["/admin/products"]);
  }

  delete(){
    if(confirm("Are you sure you want to delete this product?")){
      this.productService.delete(this.id)
      this.router.navigate(["/admin/products"]);
    }else{
      return
    }
  }
}
