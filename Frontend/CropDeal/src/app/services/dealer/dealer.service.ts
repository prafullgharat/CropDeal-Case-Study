import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private http: HttpClient) { }

  private _dealerUrl = "http://localhost:4000/api/dealer";

  getAllDealers() {
    return this.http.get<any>(this._dealerUrl +"/all-dealers");
  }

  getSubscription() {
    return this.http.get<any>(this._dealerUrl +"/subscription");
  }

  deleteDealer(userEmail) {
    return this.http.delete<any>(this._dealerUrl + "/delete/" + userEmail);
  }
  subscribeNewCrop(cropName) {
    console.log(cropName);
    return this.http.put<any>(this._dealerUrl + "/subscribe/", {cropName} );
  }
  unSubscribeCrop(cropName) {
    console.log(cropName);
    return this.http.put<any>(this._dealerUrl + "/unsubscribe/", {cropName} );
  }
}
