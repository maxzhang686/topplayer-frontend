import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {ShopService} from '../../shop/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductFormValues, IProduct} from '../../shared/models/products';
// import {IBrand} from '../../shared/models/brand';
// import {IType} from '../../shared/models/productType';

import { IPlatform } from 'src/app/shared/models/platform';
import { IGraphic } from 'src/app/shared/models/productGraphic';
import { ICategory } from 'src/app/shared/models/category';
import {forkJoin} from 'rxjs';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})

export class EditProductComponent implements OnInit {
  product: IProduct;
  productFormValues: ProductFormValues;
  // brands: IBrand[];
  // types: IType[];
  
  // platforms: IPlatform[];
  // graphics: IGraphic[];
  categories: ICategory[];
  success = false;
  edit = true;


  constructor(private adminService: AdminService,
              private shopService: ShopService,
              private route: ActivatedRoute,
              private router: Router) {
    this.productFormValues = new ProductFormValues();
  }

  // ngOnInit() {
  //   const platForms = this.getPlatforms();
  //   const graphics = this.getGraphics();
  //   forkJoin([graphics, platForms]).subscribe(results => {
  //     this.graphics = results[0];
  //     this.platforms = results[1];
  //   }, error => {
  //     console.log(error);
  //   }, () => {
  //     if (this.route.snapshot.url[0].path === 'edit') {
  //       this.loadProduct();
  //     }
  //   });
  //   if (this.route.snapshot.url[0].path === 'create') {
  //     this.edit = false;
  //   }
  // }

  ngOnInit() {
    // const platForms = this.getPlatforms();
    // const graphics = this.getGraphics();
    const categories = this.getCategories();
 
    forkJoin([categories]).subscribe(results => {
      this.categories = results[0];
      //console.log(this.categories)
      // this.platforms = results[1];
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadProduct();
      }
    });
    if (this.route.snapshot.url[0].path === 'create') {
      this.edit = false;
    }
  }

  updatePrice(event: any) {
    this.product.price = event;
    //console.log(this.product.price)
  }

  loadProduct() {
    this.shopService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      // const productPlatformId = this.platforms && this.platforms.find(x => x.name === response.productPlatform).id;
      // const productGraphicId = this.graphics && this.graphics.find(x => x.name === response.productGraphic).id;
      const productCategoryId = this.categories && this.categories.find(x => x.name === response.productCategory).id;
      this.product = response;
      console.log("Load product response" , this.product)
      this.productFormValues = {...response, productCategoryId};
      // console.log("Load product Form", this.productFormValues);
      
    });
  }

  // getPlatforms() {
  //   return this.shopService.getPlatforms();
  // }

  // getGraphics() {
  //   return this.shopService.getGraphics();
  // }
  getCategories() {
    return this.shopService.getCategories();
  }

}
