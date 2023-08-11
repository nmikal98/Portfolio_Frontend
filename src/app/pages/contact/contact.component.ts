import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  FormData: FormGroup | any;
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private ds: DataService,
    public toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      Comment: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.FormData.controls;
  }

  onSubmit(FormData: any) {
    this.submitted = true;

    if (this.FormData.invalid) {
      this.toaster.error('Form Submission Failed');
      return;
    }

    this.spinner.show();
    this.FormData.reset();

    Object.keys(this.FormData.controls).forEach((key) => {
      const control = this.FormData.controls[key];
      control.setErrors(null);
    });

    this.ds.sendEmail(FormData).subscribe((res) => {
      if (res.meta.status == 200) {
        this.toaster.success('Form Submitted Succesfully');
        this.spinner.hide();
      } else {
        this.toaster.error('Something went wrong');
        this.spinner.hide();
      }
    });
  }
}
