import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routesWithoutHeader: string[] = ['/login', '/register'];

  constructor(private router: Router) {
  }

  hasHeader(): boolean {
    const path = this.router.url;
    return !this.routesWithoutHeader.includes(path);
  }
}
