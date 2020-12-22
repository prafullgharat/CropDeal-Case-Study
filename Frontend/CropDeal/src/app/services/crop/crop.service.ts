import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  private _cropsUrl = "http://localhost:3000/api/crops";
  private _filteredCropsUrl = "http://localhost:3000/api/filtered-crops";
  private _publishCropUrl = "http://localhost:3000/api/crop";
  private _CropsByFarmerIdUrl = "http://localhost:3000/api/crop/farmer";
  private _CropByIdUrl = "http://localhost:3000/api/crop/";

  private _subscribedCropsUrl = "http://localhost:4000/api/dealer/subscribed-crops";


  // private _farmersUrl = "http://localhost:4000/api/farmer";


  constructor(private http: HttpClient) { }

  getCrops() {
    return this.http.get<any>(this._cropsUrl);
    // return this.http.get<any>(this._farmersUrl)

  }
  getCropsByFarmerId(farmerEmail) {
    return this.http.get<any>(this._CropsByFarmerIdUrl + "/" + farmerEmail);
    // return this.http.get<any>(this._farmersUrl)
  }

  publishCrop(crop) {
    return this.http.post<any>(this._publishCropUrl, crop);

    // return this.http.get<any>(this._farmersUrl)

  }

  getCropById(cropId) {
    return this.http.get<any>(this._CropByIdUrl + cropId);
  }

  getFilteredCrops(categoryArray){
    // console.log(categoryArray);
    return this.http.post<any>(this._filteredCropsUrl, categoryArray);
  }

  getSubscribedCrops(categoryArray){
    // console.log(categoryArray);
    return this.http.post<any>(this._subscribedCropsUrl, categoryArray);
  }


}
