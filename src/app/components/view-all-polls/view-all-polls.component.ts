import { Component, OnInit } from '@angular/core';
import { IPoll } from 'src/app/interfaces/poll-interfaces';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-view-all-polls',
  templateUrl: './view-all-polls.component.html',
  styleUrls: ['./view-all-polls.component.css']
})
export class ViewAllPollsComponent implements OnInit {
  polls: IPoll[] = [];

  constructor(private httpService: HttpClientService) { }

  ngOnInit(): void {
    this.httpService.getAllPolls().subscribe(polls => this.polls = polls);
  }

}
