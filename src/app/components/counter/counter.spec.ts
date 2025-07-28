import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Counter } from "./counter";
import { provideZonelessChangeDetection } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('counter component: ', () => {
  let fixture:ComponentFixture<Counter>,component:Counter
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[Counter],
      providers:[
        provideZonelessChangeDetection()
      ]
    })
    fixture=TestBed.createComponent(Counter)
    component=fixture.componentInstance
  })
  it('should create component', () => {
    expect(component).toBeDefined();
  });
  it('should render counter=0', () => {

    expect(component.counter).toBe(0)
    //access p tag in template
    fixture.detectChanges()
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("0");
  });
  it("should increase counter when click btn + then render counter in template",()=>{
    
    //access btn tag
   let btn= fixture.debugElement.query(By.css("#inc"))
    //fire click event
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    //assert change in p tag
    fixture.detectChanges()
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("3")
  })
  it("should decrease counter when click btn - then render counter in template",()=>{
    
    //access btn tag
  //  let btn= fixture.debugElement.query(By.css("#inc"))
  //   //fire click event
  //   btn.triggerEventHandler("click")
  //   btn.triggerEventHandler("click")
  //   btn.triggerEventHandler("click")

    let btnDec= fixture.debugElement.query(By.css("#dec"))
    btnDec.triggerEventHandler("click")
    //assert change in p tag
    fixture.detectChanges()
    let p= fixture.nativeElement.querySelector("p")
    expect(p.textContent).toContain("-1")
  })
});
