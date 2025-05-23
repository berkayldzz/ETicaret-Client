import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';
import { DialogService } from '../../services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../services/common/models/product.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { SpinnerType } from '../../base/base.component';
import { List_Product_Image } from '../../contracts/list_product_image';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  @Output() options!: Partial<FileUploadOptions>;
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>, private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
  ) {
    super(dialogRef)
  }
  images: List_Product_Image[];
 async ngOnInit() {

    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallAtom));

    this.options = {
      accept: ".png, .jpg, .jpeg, .gif",
      action: "upload",
      controller: "products",
      explanation: "Ürün resimini seçin veya buraya sürükleyin...",
      isAdminPage: true,
      queryString: `id=${this.data}`
    };
  }


  async deleteImage(imageId: string, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom)
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.BallAtom);
          var card = $(event.srcElement).parent().parent();
          debugger;
          card.fadeOut(500);
        });
      }
    })
  }
  showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallAtom);

    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide(SpinnerType.BallAtom);
    });
  }
}

export enum SelectProductImageState {
  Close
}
