import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "../message/message.service";
import { provideZonelessChangeDetection } from "@angular/core";

describe("hero service:", () => {
  let httpTesting:HttpTestingController,service:HeroService
  let mockMessageService:jasmine.SpyObj<MessageService>
  let heroesUrl = 'http://localhost:3000/heroes'
  beforeEach(()=>{
    mockMessageService= jasmine.createSpyObj(["add"])
    //1
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide:MessageService, useValue:mockMessageService}
      ],
    });
    // 2
     httpTesting = TestBed.inject(HttpTestingController);
    // 3
    service=TestBed.inject(HeroService)

  })
  it('getHero', () => {
    
    service.getHero(3).subscribe((data)=>{
      expect(data.name).toBe("super man")
      expect(mockMessageService.add).toHaveBeenCalled()
    })
    
    
    let testReq= httpTesting.expectOne(heroesUrl+"/3")
    expect(testReq.request.method).toBe("GET")

    testReq.flush({id:3,name:"super man",strength:20})
  });

  it("addHero",()=>{
    service.addHero({id:3,name:"super man",strength:20}).subscribe({next:(data)=>{
      expect(data.id).toBe(3)
    }})

   let testReq= httpTesting.expectOne(heroesUrl)
    expect(testReq.request.method).toBe("POST")
    expect(testReq.request.body.id).toBe(3)

    testReq.flush({id:3,name:"super man",strength:20})
  })
  afterEach(()=>{
    httpTesting.verify();
  })
})


