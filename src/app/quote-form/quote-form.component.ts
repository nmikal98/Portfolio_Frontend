import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit {
  quoteForm: FormGroup | any;
  submitted = false;

  constructor(
    private dialogRef: MatDialogRef<QuoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,

    private formBuilder: FormBuilder,
    private ds: DataService,
    public toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.quoteForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(FormData: any) {
    this.submitted = true;

    if (this.quoteForm.invalid) {
      this.toaster.error('Form Submission Failed');
      return;
    }

    this.spinner.show();
    this.quoteForm.reset();

    Object.keys(this.quoteForm.controls).forEach((key) => {
      const control = this.quoteForm.controls[key];
      control.setErrors(null);
    });

    FormData.message = this.data;

    this.ds.rmiEmail(FormData).subscribe((res) => {
      if (res.meta.status == 200) {
        this.toaster.success('Thanks for reaching out');
        this.spinner.hide();
        this.closeDialog();
      } else {
        this.toaster.error('Something went wrong');
        this.spinner.hide();
      }
    });
  }

  get e() {
    return this.quoteForm.controls;
  }
}
