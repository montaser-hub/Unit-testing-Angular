import { StrengthPipe } from "./strength-pipe";

describe("strength pipe:", () => { 
  let pipe:StrengthPipe
  beforeEach(()=>{
    pipe= new StrengthPipe()
  })
  it('should return contains weak when passing 4', () => {
    expect(pipe.transform(4)).toContain("weak")
});
  it('should return contains strong when passing 11', () => {
    expect(pipe.transform(11)).toMatch(/strong/)
});
  it('should return contains unbelievable when passing 23', () => {
    expect(pipe.transform(23)).toMatch(/unbelievable/)
});
})