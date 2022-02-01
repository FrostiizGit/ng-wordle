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
  // Used by the modal
  isVisible = false;
  isOkLoading = false;
  userToDelete: string = '';

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

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.userToDelete) {
      console.log(this.userToDelete)
      this.http.deleteAccount(this.userToDelete).subscribe(() => {
        this.userToDelete = '';
        this.isVisible = false;
        this.isOkLoading = false;
      })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}
