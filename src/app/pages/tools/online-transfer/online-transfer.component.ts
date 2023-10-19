import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PopupWindowComponent } from 'src/app/popup-window/popup-window.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-online-transfer',
  templateUrl: './online-transfer.component.html',
  styleUrls: ['./online-transfer.component.scss'],
})
export class OnlineTransferComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('numberInput') numberInput!: ElementRef;

  retrieve_code: number | null = null;
  fileToUpload: any;

  constructor(
    private http: HttpClient,
    private ts: ToastrService,
    private dialog: MatDialog,
    private ds: DataService
  ) {}

  onFileChange(event: any) {
    const file = event.target.files.item(0);

    if (file) {
      const allowedFileTypes = [
        'text/plain',
        'application/zip',
        'application/x-zip-compressed',
        'image/jpeg',
        'image/png',
        'application/pdf',
      ];

      if (allowedFileTypes.includes(file.type)) {
        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB <= 50) {
          this.fileToUpload = file;
        } else {
          this.fileToUpload = null;
          this.ts.error('Please upload a file smaller than 50MB');
        }
      } else {
        this.fileToUpload = null;
        this.fileInput.nativeElement.value = '';
        this.ts.error(
          'Unsupported file type. Please upload a valid file. (.zip, .png, .jpeg, .txt, .pdf)'
        );
      }
    }
  }

  onUpload() {
    if (!this.fileToUpload) {
      this.ts.error('No file selected');
      return;
    }

    const formData = new FormData();

    formData.append('fileInput', this.fileToUpload);

    this.ds.uploadFile(formData).subscribe(
      (res: any) => {
        this.ts.success('Upload successful!');
        this.fileInput.nativeElement.value = '';

        const code = res.data.code;

        this.showPopupWithCode(code);
      },
      (error) => {
        console.error('Upload error:', error);
        this.ts.error('Upload error');
      }
    );
  }

  showPopupWithCode(code: string) {
    const dialogRef = this.dialog.open(PopupWindowComponent, {
      width: '300px',
      data: { code: code },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the popup is closed, if needed
    });
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim();

    if (inputValue.length > 4) {
      inputElement.value = inputValue.slice(0, 4);
    }
  }

  onRetrieve() {
    var code: number = 0;

    if (this.retrieve_code) {
      code = this.retrieve_code;
      this.numberInput.nativeElement.value = null;
    } else {
      this.numberInput.nativeElement.value = null;
      this.ts.error('Please provide a valid pin...');
      return;
    }

    this.ds.downloadFile(code).subscribe(
      (res: any) => {
        if (res) {
          let downloadURL = window.URL.createObjectURL(res);
          saveAs(downloadURL);
        } else {
          this.ts.error('File does not exists or download expired!');
        }
      },
      (error) => {
        console.error('Download error:', error);
        this.ts.error('Download error');
      }
    );
  }
}
