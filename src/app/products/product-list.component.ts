import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';
// import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit{
    pageTitle: string = 'Product List';
    
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    includeDetail:boolean=true;

    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    parentListFilter:string;
  

    // @ViewChild(NgModel) filterInput: NgModel;

    // private _filterInput:NgModel;
    // private _sub:Subscription;
    
    // get filterInput():NgModel{
    //     return this._filterInput;
    // }
    // @ViewChild(NgModel)
    // set filterInput(value:NgModel){
    //     this._filterInput=value;
    //     console.log(this.filterInput);
    //     if(this.filterInput && !this._sub){
    //     console.log('Subscribing');
    //      this._sub=this.filterInput.valueChanges.subscribe(
    //         ()=> {
    //             this.performFilter(this.listFilter);
    //             console.log('Performed the filter');
    //         }
    //        );
    //     }
    //     if(this.filterElementRef){
    //        this.filterElementRef.nativeElement.focus();
    //     }
    // }

    // private _listFilter:string;
    // get listFilter():string{
    //     return this._listFilter;
    // }
    // set listFilter(value:string){
    //     this._listFilter=value;
    //     this.performFilter(this.listFilter);
    // }

    constructor(private productService: ProductService, private productParameterService:ProductParameterService) { 
  
    }

    get showImage():boolean{
        return this.productParameterService.showImage;
    }
    set showImage(value:boolean){
        this.productParameterService.showImage=value;
    }
    ngAfterViewInit():void{
        this.parentListFilter=this.filterComponent.listFilter;
    }
 

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter=this.productParameterService.filterBy;
                // this.performFilter();
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
    onValueChange(value:string){
        this.productParameterService.filterBy=value;
        this.performFilter(value);
    }
    // onFilterChange(filter:string):void{
    //     this.listFilter=filter;
    //     this.performFilter(this.listFilter);

    // }
}
