import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IPoll, IPollIds, IPollNew} from '../interfaces/poll-interfaces';
import {environment} from "../../environments/environment";

const httpOptions: { headers: HttpHeaders} = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiUrl: string = environment.apiUrl;
  private authUrl: string = environment.authUrl;

  constructor(private http: HttpClient) {
  }

  private static setAuthHeaders(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }

  getPoll(id: string): Observable<IPoll> {
    const fullUrl = `${this.apiUrl}/id/${id}`;
    return this.http.get<IPoll>(fullUrl, httpOptions);
  }

  getAllPolls(): Observable<IPoll[]> {
    return this.http.get<IPoll[]>(this.apiUrl, httpOptions);
  }

  postPollVote(pollIds: IPollIds): Observable<IPoll> {
    const fullUrl = `${this.apiUrl}/vote`;
    return this.http.post<IPoll>(fullUrl, pollIds);
  }

  createPoll(newPoll: IPollNew, token: string): Observable<IPoll> {
    const fullUrl = `${this.apiUrl}/new`;

    return this.http.post<IPoll>(fullUrl, newPoll, HttpClientService.setAuthHeaders(token));
  }

  register(newUser: any): Observable<any> {
    const fullUrl = `${this.authUrl}/register`;
    return this.http.post(fullUrl, newUser, httpOptions);
  }

  login(user: any): Observable<any> {
    const fullUrl = `${this.authUrl}/login`;
    return this.http.post(fullUrl, user, httpOptions);
  }

  getUserPolls(token: string): Observable<IPoll[]> {
    const fullUrl = `${this.apiUrl}/user`;
    return this.http.get<IPoll[]>(fullUrl, HttpClientService.setAuthHeaders(token));
  }

  deletePoll(pollId: string, token: string): Observable<boolean> {
    const fullUrl = `${this.apiUrl}/delete/${pollId}`;
    return this.http.delete<boolean>(fullUrl, HttpClientService.setAuthHeaders(token))
  }

  deleteAccount(username: string): Observable<boolean> {
    const fullUrl = `${this.authUrl}/forgot/${username}`;
    return this.http.delete<boolean>(fullUrl);
  }
}
