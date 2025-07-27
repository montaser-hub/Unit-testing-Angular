import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ihero } from '../../models/ihero';
import { MessageService } from '../message/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:3000/heroes'; 


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes (): Observable<Ihero[]> {
    return this.http.get<Ihero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }


  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Ihero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Ihero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Ihero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Ihero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Ihero[]>(`http://localhost:3000/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Ihero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Ihero): Observable<Ihero> {
    return this.http.post<Ihero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Ihero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Ihero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Ihero | number): Observable<Ihero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Ihero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Ihero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Ihero): Observable<any> {
    return this.http.patch(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
