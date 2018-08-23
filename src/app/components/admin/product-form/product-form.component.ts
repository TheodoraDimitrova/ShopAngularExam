import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../../services/category.service";
import { map, take } from 'rxjs/operators';
import { ProductService } from "../../../services/product.service";
import { AppProduct } from "../../../models/app-product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  model: any = {};
  product={}

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();
    let id=this.route.snapshot.paramMap.get('id')

    if(id) this.productService.getProduct(id).pipe(take(1)).subscribe(p => this.product=p)
  }

  ngOnInit() {
  
  }

  save(product: AppProduct) {
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }
}
