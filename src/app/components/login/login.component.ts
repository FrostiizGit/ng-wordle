import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClientService} from "../../services/http-client.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClientService,
    private ls: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const user = {
        username: this.validateForm.value.userName,
        password: this.validateForm.value.password
      }
      this.http.login(user).subscribe((res) => {
        this.ls.set('token', res.token);
        this.router.navigate(['']).catch(e => console.warn(e));
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

}
