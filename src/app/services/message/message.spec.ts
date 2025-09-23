import { TestBed } from "@angular/core/testing";
import { MessageService } from "./message.service";

describe("message service:",()=>{
  let service:MessageService
  beforeEach(()=>{
    
   service=new MessageService()
  })
    it('add function: should add new msg', () => {
    service.add("msg 1")

    expect(service.messages).toHaveSize(1)
  });
    it('clear function: should add new msg', () => {
    let service= new MessageService()
    service.add("msg 1")

    service.clear()
    expect(service.messages).toHaveSize(0)
  });
})