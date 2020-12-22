import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCrop'
})

export class SearchCropPipe implements PipeTransform {

  transform(value: any, cropName: any): any {
    // console.log(value);
    // console.log("cropname: "+cropName);
    if(cropName.length === 0){
      return value;
    }
    
    return value.filter(function(crop){
      // console.log(crop)
      return crop.name.toLowerCase().indexOf(cropName.toLowerCase()) > -1

    });
  }

}
