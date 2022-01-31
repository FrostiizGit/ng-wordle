import {Component, Input, OnInit} from '@angular/core';
import {IPoll, IPollAnswers} from 'src/app/interfaces/poll-interfaces';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.css']
})
export class PollCardComponent implements OnInit {
  @Input() poll: IPoll;
  @Input() pollNumber: number = 0;

  isInfoView: number = 0; // Used to toggle between Default & Result view
  answersPercent: number[] = []; // Num of votes to %
  cardTitle: string = '';
  infoTabTitle: string = 'Info';
  resultsTabTitle: string = 'Result';

  constructor() {
    this.poll = {
      _id: 'none',
      creator: 'Anonymous',
      title: '...',
      answers: [],
      totalVotes: 0
    };
  }

  percentage(partialValue: number, totalValue: number): number {
    if (partialValue === 0) return 0;
    return Math.round((100 * partialValue) / totalValue);
  }

  cardNumFormat(cardNumber: number): string {
    if (!cardNumber) return '#';
    if (cardNumber < 10) {
      return `#00${cardNumber}`;
    } else if (cardNumber < 100) {
      return `#0${cardNumber}`;
    } else {
      return `#${cardNumber}`;
    }
  }

  ngOnInit(): void {
    this.answersPercent = this.poll.answers.map((answer: IPollAnswers) =>
      this.percentage(answer.vote, this.poll.totalVotes)
    );
  }

  ngOnChanges(): void {
    this.cardTitle = `Poll ${this.cardNumFormat(this.pollNumber)}`;
  }
}
