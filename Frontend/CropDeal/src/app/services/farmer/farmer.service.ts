import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private http: HttpClient) { }

  private _farmerUrl = "http://localhost:4000/api/farmer";

  getAllFarmers() {
    return this.http.get<any>(this._farmerUrl +"/all-farmers");
  }

  deleteFarmer(userEmail) {
    return this.http.delete<any>(this._farmerUrl + "/delete/" + userEmail);
  }
}
