import { Component, Input, OnInit } from '@angular/core';
import { IPoll, IPollAnswers } from 'src/app/interfaces/poll-interfaces';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.css']
})
export class PollCardComponent implements OnInit {
  @Input() poll: IPoll;
  isInfoView: number = 0;
  answersPercent: number[] = [];

  constructor() { 
    this.poll = {
      _id: 'none',
      creator: 'Anonymous',
      title: '...',
      answers: [],
      totalVotes: 0
    }
  }

  percentage(partialValue: number, totalValue: number) {
    if (partialValue === 0) return 0;
    return Math.round((100 * partialValue) / totalValue);
  } 


  ngOnInit(): void {
    this.answersPercent = this.poll.answers.map((answer: IPollAnswers) => 
      this.percentage(answer.vote, this.poll.totalVotes)
    );
  }

  

}
