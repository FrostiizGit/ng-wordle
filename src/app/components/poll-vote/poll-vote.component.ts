import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPoll, IPollIds } from 'src/app/interfaces/poll-interfaces';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements OnInit {
  pollId: string = '';
  poll!: IPoll;
  radioValue: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClientService, private router: Router) { }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id) {
      this.pollId = id;
      this.http.getPoll(id).subscribe(data => this.poll = data);
    }
  }

  voteClick(): void {
    if (this.radioValue !== '') {
      const pollIds: IPollIds = {
        pollId: this.poll._id,
        answerId: this.radioValue
      }
      this.http.postPollVote(pollIds).subscribe(res => {
        this.router.navigate(['']);
      });
    }
  }

}
