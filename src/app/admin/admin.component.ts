import { Component, OnInit } from '@angular/core';
import {ShopService} from '../shop/shop.service';
import {AdminService} from './admin.service';
import {IProduct} from '../shared/models/products';
import {ShopParams} from '../shared/models/shopParams';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: IProduct[];
  totalCount: number;
  shopParams: ShopParams;

  constructor(private shopService: ShopService, private adminService: AdminService) {
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProductsByAdmin();
  }

  getProductsByAdmin() {
    this.shopService.getProductsByAdmin().subscribe((response:[]) => {
      this.products = response;
      // console.log(response)
      // this.totalCount = response.count;
    }, error => {
      // console.log(error);
    });
  }

  // onPageChanged(event: any) {
  //   const params = this.shopService.getShopParams();
  //   if (params.pageNumber !== event) {
  //     params.pageNumber = event;
  //     this.shopService.setShopParams(params);
  //     this.getProductsByAdmin();
  //   }
  // }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe((response: any) => {
      this.products.splice(this.products.findIndex(p => p.id === id), 1);
      this.totalCount--;
    });
  }
}