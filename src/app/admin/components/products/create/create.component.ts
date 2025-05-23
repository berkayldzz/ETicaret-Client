import { Component, Output } from '@angular/core';
import { Create_Product } from '../../../../contracts/create_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { EventEmitter } from '@angular/core';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

  // Componentlerin ts dosyalarında işlem yapılmaz.Bu componentler ts dosyalarında işlem yapacağımız servislerin komutlarını çağırır.Yani direkt bir ekleme silme güncelleme işlemi olmaz.Servisler üzerinden yönetilir.Crud işlemleri serviste.

 //  subscribe metodu iki parametre alır:
 //  Başarılı yanıt için çalıştırılacak callback fonksiyonu → successCallBack();
 //  Hata durumunda çalıştırılacak callback fonksiyonu → (errorResponse: HttpErrorResponse) => { ... }
export class CreateComponent extends BaseComponent {
  constructor(spiner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
  super(spiner)}

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  //@Output() fileUploadOptions: Partial<FileUploadOptions> = {
  //  action: "upload",
  //  controller: "products",
  //  explanation: "Resimleri sürükleyin veya seçin...",
  //  isAdminPage: true,
  //  accept: ".png, .jpg, .jpeg, .json"
  //};

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_product);
    }, errorMessage => { //errorCallBack(message); çağrıldığında (product.serivce içinde), message değişkeni doğrudan errorMessage parametresine atanır.
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
