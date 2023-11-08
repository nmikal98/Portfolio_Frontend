import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PopupWindowComponent } from 'src/app/popup-window/popup-window.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/data.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss'],
})
export class ClipboardComponent {
  textAreaInput: string = '';
  maxCharacters: number = 1000; // Set the maximum character limit here
  retrieve_code: number | null = null;

  displayTextFromDB: string = '';

  constructor(
    private ts: ToastrService,
    private dialog: MatDialog,
    private ds: DataService,
    private clipboardService: ClipboardService
  ) {}

  onFormSubmit() {
    //console.log('Text in the textarea:', this.textAreaInput);

    if (this.textAreaInput) {
      this.ds.uploadNote({ note: this.textAreaInput }).subscribe(
        (res: any) => {
          this.ts.success('Upload successful!');

          const code = res.data.code;

          this.showPopupWithCode(code);
        },
        (err: any) => {
          this.ts.error('Something went wrong...');
          console.log(err);
        }
      );
    } else {
      this.ts.error('Note cannot be empty');
    }
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

    this.ds.downloadNote(code).subscribe(
      (res: any) => {
        if (res) {
          this.copyToClipboard(res.data.note);

          this.displayTextFromDB = res.data.note;
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

  copyToClipboard(text: string) {
    this.clipboardService.copyFromContent(text);
    this.ts.success('Copied: ' + text);
  }
}
