import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { timer } from 'rxjs/observable/timer';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product Detail';
    // product=this.productService.currentProduct;

    product: IProduct | null;
    sub: Subscription;
    // get product(): IProduct | null{
    //     return this.productService.currentProduct;
    // }
    constructor(private productService: ProductService) { }

    ngOnInit() {
        // timer(0,1000).subscribe(t=>
        //     console.log(this.prod));
        this.sub=this.productService.selectedProductChanges$.subscribe(
            selectedProduct=> this.product=selectedProduct
        );
    }
    ngOnDestroy():void{
        this.sub.unsubscribe();
    }

}
