import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';

// Eğer ki bir modül başka bir modülü kendi içinde benimseyecekse o modülü import etmesi gerekir.

// Angular uygulamalarında farklı modüllerde declare edilmiş componentleri kendş aralarında selector ile referans edebilmek için bunların export edilmesi gerekmektedir.Sadece import etmek yetmez.

@NgModule({
  declarations: [],
  imports: [CommonModule, LayoutModule, ComponentsModule],
  exports: [LayoutModule],
})
export class AdminModule {}
