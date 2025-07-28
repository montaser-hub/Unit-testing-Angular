import { StrengthPipe } from "./strength-pipe";

describe("strength pipe:", () => { 
  let pipe:StrengthPipe
  beforeEach(()=>{
    pipe= new StrengthPipe()
  })
   it('should return weak when passing 9', () => {  
    
    expect(pipe.transform(9)).toBe("9 (weak)")
  });
   it('should return strong when passing 12', () => {  
    
    expect(pipe.transform(12)).toContain("strong")
  });
   it('should return unbelievable when passing 30', () => {  
    
    expect(pipe.transform(30)).toMatch(/unbelievable/i)
  });

})