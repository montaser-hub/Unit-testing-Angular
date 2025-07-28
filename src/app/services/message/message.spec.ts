import { MessageService } from "./message.service";

describe("message service:",()=>{
  let service:MessageService
  beforeEach(()=>{
    service= new MessageService()
  })
   it('should add 1 message in array', () => {
   
    service.add("msg 1")

    expect(service.messages).toHaveSize(1)
    expect(service.messages[0].message).toBe("msg 1")
  });
   it('should clear after add 2 messages in array', () => {
   
    service.add("msg 1")
    service.add("msg 2")

    service.clear()

    expect(service.messages).toHaveSize(0)
  });
})