import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IPoll, IPollIds, IPollNew} from '../interfaces/poll-interfaces';

const httpOptions: { headers: HttpHeaders} = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiUrl: string = 'http://localhost:3000/poll';

  constructor(private http: HttpClient) {
  }

  getPoll(id: string): Observable<IPoll> {
    const fullUrl = `${this.apiUrl}/${id}`;
    return this.http.get<IPoll>(fullUrl, httpOptions);
  }

  getAllPolls(): Observable<IPoll[]> {
    return this.http.get<IPoll[]>(this.apiUrl, httpOptions);
  }

  postPollVote(pollIds: IPollIds): Observable<IPoll> {
    const fullUrl = `${this.apiUrl}/vote`;
    return this.http.post<IPoll>(fullUrl, pollIds);
  }

  createPoll(newPoll: IPollNew): Observable<IPoll> {
    const fullUrl = `${this.apiUrl}/new`;
    return this.http.post<IPoll>(fullUrl, newPoll);
  }
}
