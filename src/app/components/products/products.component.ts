import { Component } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { CategoryService } from "../../services/category.service";
import { ActivatedRoute } from "../../../../node_modules/@angular/router";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  products: any[];
  categories$;
  category: string;
  filteredProducts: any[];

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService,
    private cardService: ShoppingCartService
  ) {
    productService.getAll().subscribe(p => {
      this.products = p;
      this.categories$ = categoryService.getCategories();
      route.queryParamMap.subscribe(params => {
        this.category = params.get("category");
        this.filteredProducts = this.category
          ? this.products.filter(p => p.data.category === this.category)
          : this.products;
      });
    });
  }

  addToCart(product) {
    this.cardService.addToCart(product);
  }
}
