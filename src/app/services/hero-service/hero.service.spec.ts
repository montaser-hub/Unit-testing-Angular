import { provideHttpClient } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('hero service:', () => {
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let service:HeroService,httpTesting:HttpTestingController
  let heroesUrl = 'http://localhost:3000/heroes'
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    //1
    TestBed.configureTestingModule({
      providers: [

        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
        //2
        provideZonelessChangeDetection(),
        {provide:MessageService,useValue:mockMessageService}
      ],
    });
    //3
     httpTesting = TestBed.inject(HttpTestingController);
    //4
    service=TestBed.inject(HeroService)
  });
  it('getHero: should send req get(url+/id) and return observable with res', () => {
    service.getHero(3).subscribe((data)=>{
      expect(data.name).toBe("super man")
    })

   let testReq= httpTesting.expectOne(heroesUrl+"/3")
    expect(testReq.request.method).toBe("GET");

    testReq.flush({id:3,name:"super man",strength:30})

  });
  it("addHero: send req post(url) with body then return observable with res",()=>{
    let hero={id:3,name:"super man",strength:30}
    service.addHero(hero).subscribe((data)=>{
      expect(data).toEqual(hero)
    })

    let mockReq=httpTesting.expectOne(heroesUrl)
    expect(mockReq.request.method).toBe("POST")
    expect(mockReq.request.body).toEqual(hero)

    mockReq.flush(hero)
    
  })
  afterEach(()=>{
    httpTesting.verify()
  })
});
