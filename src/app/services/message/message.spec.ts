import { MessageService } from "./message.service";

describe("message service:",()=>{
  let messageService:MessageService
  beforeEach(()=>{
     messageService= new MessageService()
  })
  it('should add new msg', () => {
    
/////
    messageService.add("msg 1")

    expect(messageService.messages).toHaveSize(1)
  });
  it("should clear the msg array",()=>{
    messageService.add("msg 1")
    messageService.add("msg 2")
    messageService.clear()
    expect(messageService.messages).toHaveSize(0)
  })
})