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
<<<<<<< HEAD
  
=======
>>>>>>> af2c9e3b195a5f164b9264b3b23f9a6e7ba416ad

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService,
    private cardService: ShoppingCartService
  ) {
    productService.getAll().subscribe(p => {
      this.products = p;
<<<<<<< HEAD
      console.log(this.products);
=======
>>>>>>> af2c9e3b195a5f164b9264b3b23f9a6e7ba416ad
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
<<<<<<< HEAD
  }
  getQuantity(productKey) {
    let cartId = localStorage.getItem("cartId");
    
    if (cartId) {
      this.cardService
        .getItem(cartId, productKey)
        .snapshotChanges()
        .pipe(take(1))
        .subscribe((i: any) => {
         return i.payload.val().quantity;
        });
        
    }else{
      return 0
    }
  

    
   
=======
>>>>>>> af2c9e3b195a5f164b9264b3b23f9a6e7ba416ad
  }
 
}
