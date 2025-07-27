import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';
import { Ihero } from '../../models/ihero';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroServiceForLab {

  private heroesUrl = 'http://localhost:3000/heroes';  // URL to web api

  constructor( private http: HttpClient) { }

      /** GET heroes from the server */
  getHeroes (): Observable<Ihero[]> {
    return this.http.get<Ihero[]>(this.heroesUrl)
  }

  
  /** PUT: update the hero on the server */
  updateHero (hero: Ihero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
  }
  

  
}
