import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: {id:number,message:string}[] = [];

  add(message: string) {
    this.messages.push({id:Math.floor(Math.random()*1000),message});
  }

  clear() {
    this.messages = [];
  }
}
