import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CounterComponent } from "./counter.component";
import { By } from "@angular/platform-browser";

describe('counter component: ', () => {
  let fixture:ComponentFixture<CounterComponent>,component:CounterComponent
  beforeEach(()=>{
    TestBed.configureTestingModule({imports:[CounterComponent]})

    fixture=TestBed.createComponent(CounterComponent)
    component= fixture.componentInstance
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("template should have counter=0 in p tag",()=>{
    let p= fixture.debugElement.query(By.css("p"))

    fixture.detectChanges()
    expect(p.nativeElement.textContent).toContain(0)
  })
  it("after clicking inc btn template should have counter after increasing",()=>{
    //access btn
   let btn= fixture.debugElement.query(By.css("#inc"))
    //click
    btn.triggerEventHandler("click")

    expect(component.counter).toBe(1)
    fixture.detectChanges()
    //p
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain(1)
  })
  it("after clicking dec btn template should have counter after decreasing",()=>{
    //access btn
   let btn= fixture.debugElement.query(By.css("#dec"))
    //click
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")

    expect(component.counter).toBe(-2)
    fixture.detectChanges()
    //p
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain(-2)
  })
  
});
