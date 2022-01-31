import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {IPollNew, IPollNewAnswers} from 'src/app/interfaces/poll-interfaces';
import {HttpClientService} from 'src/app/services/http-client.service';

interface IFieldControl {
  id: number,
  controlInstance: string
}

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  validateForm!: FormGroup;
  listOfControl: Array<IFieldControl> = [];

  constructor(private fb: FormBuilder, private http: HttpClientService, private router: Router) {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const optionsValues: number[] = this.listOfControl.map(control => this.validateForm.value[control.controlInstance]);
      const newPoll: IPollNew = {
        title: this.validateForm.value.questionTitle,
        answers: optionsValues.map((value: number, index: number): IPollNewAnswers => {
          return {
            value: `a${index + 1}`,
            text: value.toString()
          }
        })
      };

      this.http.createPoll(newPoll).subscribe(async () => {
        await this.router.navigate(['']);
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
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

  // Methods from Ant Design to add fields that are controlled
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control: IFieldControl = {
      id,
      controlInstance: `a${id}`
    };
    const index: number = this.listOfControl.push(control);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index: number = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance);
    }
  }


}
