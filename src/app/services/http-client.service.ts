import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPoll, IPollIds } from '../interfaces/poll-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiUrl: string = 'http://localhost:3000/poll';

  constructor(private http: HttpClient) { }

  getPoll(id: string) {
    const fullUrl = `${this.apiUrl}/${id}`;
    return this.http.get<IPoll>(fullUrl, httpOptions);
  }

  getAllPolls(): Observable<IPoll[]> {
    return this.http.get<IPoll[]>(this.apiUrl, httpOptions);
  }

  postPollVote(pollIds: IPollIds) {
    const fullUrl = `${this.apiUrl}/vote`;
    return this.http.post(fullUrl, pollIds);
  }

  createPoll(newPoll: any) {
    const fullUrl = `${this.apiUrl}/new`;
    return this.http.post(fullUrl, newPoll);
  }
}
