import { EventEmitter } from '@angular/core';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';
import { SpinnerType } from '../../base/base.component';



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
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
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
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();   // Liste otomatik güncellenmesi için

  // html'de (callback)="getProducts()" olarak verdik ve bunu silme işlemini geçekleştirdiğimiz satır 50 de tetikliyoruz.


  // Silme operasyonu için bir evente ihtiyacımız var bu da click eventi.
  // Bu directive'in kullanıldığı dom nesnesi hangi eventi veriyosan (burada click) o olay gerçekleştirildiğinde bu metot tetikleneck.


  @HostListener("click")
  async onclick() {
    this.dialogService.openDialog({    // openDialog metoduna girdik eğer DeleteState Yes ise buradaki işlemleri yapıyor.

      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;    // Silme işlemi yapılcak olan td ' ye ihityacımız var.
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toogle"
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message("Ürün başarıyla silinmiştir.", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.BallAtom);
          this.alertifyService.message("Ürün silinirken beklenmeyen bir hatayla karşılaşılmıştır.", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
        });
      }
    });
  }

  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //    width: '250px',
  //    data: DeleteState.Yes,
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == DeleteState.Yes)
  //      afterClosed(); // openDailog metodu çalışırken bu şart geçerliyse yani evet derse silme işlemini yapacak.
  //  });
  //}

}
