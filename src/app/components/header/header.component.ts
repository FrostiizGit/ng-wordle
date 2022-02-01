import {Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = 'Username'
  isLoggedIn: boolean = false;

  constructor(private ls: LocalStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.setUsername();
  }

  setUsername(): void {
    const token = this.ls.get('token');
    const helper = new JwtHelperService();
    if(token) {
      const decoded = helper.decodeToken(token);
      this.username = decoded.username;
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    this.ls.remove('token');
    this.router.navigate(['/login']);
  }

}
