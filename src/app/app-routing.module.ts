import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAllPollsComponent } from './components/view-all-polls/view-all-polls.component';
import { PollVoteComponent } from './components/poll-vote/poll-vote.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';

const routes: Routes = [
  { path: '', component: ViewAllPollsComponent},
  { path: 'new', component: CreatePollComponent},
  { path: 'vote/:id', component: PollVoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
