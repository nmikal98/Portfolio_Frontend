import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PopupWindowComponent } from 'src/app/popup-window/popup-window.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-online-transfer',
  templateUrl: './online-transfer.component.html',
  styleUrls: ['./online-transfer.component.scss'],
})
export class OnlineTransferComponent {
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
      const fileSizeInBytes = file.size;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;

      if (fileSizeInMB > 10) {
        this.fileToUpload = null;
        this.ts.error('Please upload a file smaller than 10MB');
        return;
      }
      this.fileToUpload = event.target.files.item(0);
    }
  }

  onUpload() {
    if (!this.fileToUpload) {
      this.ts.error('No file selected');
      return;
    }

    const formData = new FormData();

    //console.log(formData);
    formData.append('fileInput', this.fileToUpload);

    this.ds.uploadFile(formData).subscribe(
      (res: any) => {
        this.ts.success('Upload successful!');

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
    } else {
      this.ts.error('Please provide a valid pin...');
      return;
    }

    this.ds.downloadFile(code).subscribe(
      (res: any) => {
        if (res) {
          const blob: Blob = new Blob([res.blob]);
          const filename: string = res.filename;
          this.downloadBlob(blob, filename);
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

  downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
