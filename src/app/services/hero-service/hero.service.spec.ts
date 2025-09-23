import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from '../message/message.service';
import { HeroService } from './hero.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('hero service:', () => {
  let serviceMock: jasmine.SpyObj<MessageService>;
  let service:HeroService,httpTesting:HttpTestingController
  let  heroesUrl = 'http://localhost:3000/heroes'
  beforeEach(() => {
    serviceMock = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide:MessageService,useValue:serviceMock },
        provideZonelessChangeDetection()
      ],
    });
     httpTesting = TestBed.inject(HttpTestingController);
   service= TestBed.inject(HeroService)
  });
  it('getHero: should send req GET /url/id then put res in observable', () => {
    service.getHero(2).subscribe(data=>{
      expect(data.name).toBe("super man")
    })

   let testReq= httpTesting.expectOne(heroesUrl+"/2")
    expect(testReq.request.method).toBe("GET")

    testReq.flush({id:2,name:"super man",strength:23})
  });

  it("addHero: ",()=>{
    let hero={id:2,name:"super man",strength:23}
    service.addHero(hero).subscribe(data=>{
      expect(data).toEqual(hero)
    })

   let testReq= httpTesting.expectOne(heroesUrl)
   expect(testReq.request.method).toBe("POST")
   expect(testReq.request.body).toEqual(hero)

   testReq.flush(hero)
  })
  afterEach(() => {
  // Verify that none of the tests make any extra HTTP requests.
  TestBed.inject(HttpTestingController).verify();
});
});
