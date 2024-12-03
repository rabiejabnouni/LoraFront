import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedConversionService {
  private conversionId:Number;
  private messageId:Number;

  constructor() {
    this.conversionId=0;
    this.messageId=0;
   }
getConversionId(){
return this.conversionId;
}
getMessageId(){
  return this.messageId;
}
setConversionId(conversionId:Number){
  this.conversionId=conversionId;
}
setMessageId(messageId:Number){
  this.messageId=messageId;
}
}
