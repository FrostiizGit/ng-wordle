import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  constructor(private fb: FormBuilder, private http: HttpClientService, private router: Router) { }

  submitForm(): void {
    if (this.validateForm.valid) {
      const optionsValues = this.listOfControl.map(control => this.validateForm.value[control.controlInstance]);
      const newPoll = {
        title: this.validateForm.value.questionTitle,
        answers: optionsValues.map((value, index) => {
          return {
            value: `a${index + 1}`,
            text: value
          }
        })
      }
      
      this.http.createPoll(newPoll).subscribe(res => {
        this.router.navigate(['']);
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      questionTitle: [null, [Validators.required]]
    });
    this.addField();
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }


}
