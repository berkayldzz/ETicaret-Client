import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
// Contract : api'nin gönderdiği datanın türü ne ise o türü karşılayacak bir sınıf oluşturuyoruz.Oluşturulan bu sınıf bizim contractımız olacak.Gelecek olan türü karşılayan sınıftır.Bu contract gelecek olan türdeki alanlara karşılık alanları barındırır.Gelen datanın direkt dönüşümünü sağlar.
// Ben bu contract üzerinden ilgili datayı direkt kullanabilirim.Tip güvenli bir şekilde erişim sağlayabilirim.
// this.httpClientService
//   .get<Product[]>({
//     controller: 'products',
//   })
//   .subscribe((data) => data[0].name);
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }
  ngOnInit(): void {
    // this.httpClientService
    //   .get<Product[]>({
    //     controller: 'products',
    //   })
    //   .subscribe((data) => data[0].name);
    // this.httpClientService
    //   .post(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       name: 'Kalem',
    //       stock: 100,
    //       price: 15,
    //     }
    //   )
    //   .subscribe();
    //   this.httpClientService
    //     .put(
    //       {
    //         controller: 'products',
    //       },
    //       {
    //         id: '3de67026-96cc-46b4-911b-f000d86269ab',
    //         name: 'Renkli Kağıt',
    //         price: 20,
    //         stock: 200,
    //       }
    //     )
    //     .subscribe((data) => console.log(data));
    //   this.httpClientService
    //     .delete(
    //       {
    //         controller: 'products',
    //       },
    //       '3de67026-96cc-46b4-911b-f000d86269ab'
    //     )
    //     .subscribe();
    // this.httpClientService
    //   .get({
    //     fullEndPoint: 'https://jsonplaceholder.typicode.com/posts',
    //   })
    //   .subscribe((data) => console.log(data));
  }
}
