import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Angular uygulamamızda bizim yapacağımız bütün http üzerinden yapılacak isteklerin sorumluluğunu bu servis üstleniyor olacak.

// baseUrl app.module içersinde tanımladık.
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  // Bu tarz bir durumu kullanmayacağız daha pratik ve olması gerektiği gibi yapacağız.
  // Örn:action yoksa niye sondaki / gelsin (sorun yaratmaz ama temiz olsun.)
  // Bu tarz parametrik çalışmalarda nesne kullanmakta fayda var.

  // get<T>(controller: string, action?: string, id?: string) {
  //   let url: string = '';
  //   url = `${this.baseUrl}/${controller}/${action}}`;
  // }

  // url yapımızı burada oluşturup metotlara verecez.
  private url(requestParameter: Partial<RequestParameters>): string {
    return `${
      requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl
    }/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ''
    }`;
  }
  get<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else url = `${this.url(requestParameter)}${id ? `/${id}` : ''}`;

    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }

  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string;
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else url = `${this.url(requestParameter)}`;

    return this.httpClient.post<T>(url, body, {
      headers: requestParameter.headers,
    });
  }

  put<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string;
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else url = `${this.url(requestParameter)}`;

    return this.httpClient.put<T>(url, body, {
      headers: requestParameter.headers,
    });
  }

  delete<T>(
    requestParameter: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else url = `${this.url(requestParameter)}/${id}`;

    return this.httpClient.delete<T>(url, {
      headers: requestParameter.headers,
    });
  }
}

// Bir nesne üzerinden parametreleri karşılıyoruz.

export class RequestParameters {
  controller?: string;
  action?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string; //bambaşka bir endpointe istek göndermek isteyebiliriz.(dışarıdan)
}
