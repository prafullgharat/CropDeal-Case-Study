import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private _orderUrl = "http://localhost:8080/api/order";

  postOrder(order) {
    return this.http.post<any>(this._orderUrl, order );
  }

  getReceiptsByFarmerEmail(email) {
    return this.http.get<any>(this._orderUrl+"/farmer/"+email );
  }

  getInvoiceById(invoiceId){
    return this.http.get<any>(this._orderUrl+"/"+invoiceId );

  }

  getReceiptsByDealerEmail(email){
    return this.http.get<any>(this._orderUrl+"/dealer/"+email );
  }

  getAllReceipts(){
    return this.http.get<any>(this._orderUrl);
  }
}
