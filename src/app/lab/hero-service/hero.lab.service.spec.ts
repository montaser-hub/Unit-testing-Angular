import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { HeroServiceForLab } from "./hero.lab.service";
import { provideZonelessChangeDetection } from "@angular/core";

describe("3-hero service (http) testing:", () => {
  let service: HeroServiceForLab, httpTesting: HttpTestingController;
  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(HeroServiceForLab);
    httpTesting = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTesting.verify();
  })
  // need to be sure the methods within service sent the request and received the response
  //tests
  it('getHeroes function: send request and receive response successfully', () => {
    service.getHeroes().subscribe((data) => {
      expect(data).toEqual([
        { id: 2, name: 'super man', strength: 23 },
        { id: 3, name: 'bat man', strength: 20 },
        { id: 4, name: 'spider man', strength: 15 },
      ]);
    });
    let testReq = httpTesting.expectOne('http://localhost:3000/heroes');
    expect(testReq.request.method).toBe('GET');

    testReq.flush([
      { id: 2, name: 'super man', strength: 23 },
      { id: 3, name: 'bat man', strength: 20 },
      { id: 4, name: 'spider man', strength: 15 },
    ]);
  });
  it('updateHero function: send request and receive response successfully', () => {
    service
      .updateHero({ id: 2, name: 'super man', strength: 23 })
      .subscribe((data) => {
        expect(data).toEqual({ id: 2, name: 'super man', strength: 23 });
      });
    let testReq = httpTesting.expectOne('http://localhost:3000/heroes');
    expect(testReq.request.method).toBe('PUT');
    testReq.flush({ id: 2, name: 'super man', strength: 23 });
  });
})
