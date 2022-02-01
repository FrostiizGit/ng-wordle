import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {HttpClientService} from "../../services/http-client.service";
import {IPoll} from "../../interfaces/poll-interfaces";

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css']
})
export class MyPollsComponent implements OnInit {
  dataSet: IPoll[] = [];

  private token: string | null = null;

  constructor(private ls: LocalStorageService, private http: HttpClientService) {
  }

  ngOnInit(): void {
    this.token = this.ls.get('token');
    this.fetchPolls();
  }

  fetchPolls() {
    if (this.token) {
      this.http.getUserPolls(this.token).subscribe((res) => {
        this.dataSet = res;
      })
    }
  }

  deletePoll(pollId: string) {
    if (this.token) {
      this.http.deletePoll(pollId, this.token).subscribe((res) => {
        if (!res) console.warn('An error occurred while trying to delete a poll');
        this.fetchPolls();
      });
    }
  }

}
