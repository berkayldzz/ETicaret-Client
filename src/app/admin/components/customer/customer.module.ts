import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';

// Bu şekilde modüler bir tasarım yapıyorsan rotalar modüllerden belirlenir.
// Bu modüle bağlı birden fazla da componentim olabilir.(örn son eklenen 5 customer listeleyen component)
// Eğer olursa onları da burada tanımlıyor olacağız.

// Her componente karşılık modülü seviyesinde bir rota belirlemiş olduk.
// Uygulama bu rota childlarından artık haberdar.Child oldukları için kullanılabilir hale yani root hale getirmemiz gerekiyor.Bunu da ana modülde root rota haline getiriyoruz.(app-routing.module)

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CustomerComponent },
      //{ path: 'cusomerbilmemne', component: CustomerbilmemneComponent }
    ]),
  ],
})
export class CustomerModule {}
