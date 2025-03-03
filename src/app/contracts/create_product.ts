export class Create_Product {
  name: string;
  stock: number;
  price: number;
}

// Contract : api'nin gönderdiği datanın türü ne ise o türü karşılayacak bir sınıf oluşturuyoruz.Oluşturulan bu sınıf bizim contractımız olacak.Gelecek olan türü karşılayan sınıftır.Bu contract gelecek olan türdeki alanlara karşılık alanları barındırır.Gelen datanın direkt dönüşümünü sağlar.

// Ben bu contract üzerinden ilgili datayı direkt kullanabilirim.Tip güvenli bir şekilde erişim sağlayabilirim.

// this.httpClientService
//   .get<Product[]>({
//     controller: 'products',
//   })
//   .subscribe((data) => data[0].name);
