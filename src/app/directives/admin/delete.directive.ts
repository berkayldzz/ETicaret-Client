
import { EventEmitter } from '@angular/core';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { ProductService } from '../../services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'  // bu keyword kullanarak bu directive'de tanımladığımız özellikleri html elementlerine verebiliyoruz.
})

  // Directive : Html'deki DOM nesnelerini manipüle etmemizi sağlayan ve bu manipüle operasyonlarını bir tane keyworde karşılık yapmamızı sağlayan bir angular özelliğidir.
  // Tekrar eden durumlar için bu directive'i tasarlıyorsun ve o directivi html içinde kullanabiliyorsun.
export class DeleteDirective {

  constructor(
    private element: ElementRef,  // directive'i çağırdığım html nesnesine erişmek için 
    private _renderer: Renderer2,  // bu nesneye manipülasyon işlemleri yapabilmek için çağırdık.
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {
    // directive'i kullanacağımız nesneye image vermek için img etiketi oluşturuyoruz ve buna src ve style attribute ekliyoruz sonra değerlerini  veriyoruz.
    // Böylece bu directive'i kullandığımız yerde ekstra bir buton vs eklememize gerek yok directive'i verdiğin yerde img çıkacak.
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img); // img nesnesini oluşturduk ve bunu ekleyeceğimiz yeri belirttik ve ekledik.
  }

  @Input() id: string;  // td üzerindeki id'yi böyle aldık.
  @Output() callback: EventEmitter<any> = new EventEmitter();   // Liste otomatik güncellenmesi için

  // html'de (callback)="getProducts()" olarak verdik ve bunu silme işlemini geçekleştirdiğimiz satır 50 de tetikliyoruz.


  // Silme operasyonu için bir evente ihtiyacımız var bu da click eventi.
  // Bu directive'in kullanıldığı dom nesnesi hangi eventi veriyosan (burada click) o olay gerçekleştirildiğinde bu metot tetikleneck.
  @HostListener("click")
  async onclick() {
    this.spinner.show(SpinnerType.BallAtom);
    // Silme işlemi yapılcak olan td ' ye ihityacımız var.
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(2000, () => {  // ilgili td'ye gizlenme efekti verdik.
      this.callback.emit();
    });
  }

}
