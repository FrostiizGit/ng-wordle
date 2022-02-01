import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

// Angular module added by ng-zorro aka Ant Design
import {registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';

// Ant Design modules
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzIconModule} from 'ng-zorro-antd/icon';

// Components imports
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ViewAllPollsComponent} from './components/view-all-polls/view-all-polls.component';
import {PollCardComponent} from './components/poll-card/poll-card.component';
import {PollVoteComponent} from './components/poll-vote/poll-vote.component';
import {CreatePollComponent} from './components/create-poll/create-poll.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewAllPollsComponent,
    PollCardComponent,
    PollVoteComponent,
    CreatePollComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzTabsModule,
    NzProgressModule,
    NzRadioModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzIconModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
