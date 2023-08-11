import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.scss'],
})
export class PopupWindowComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupWindowComponent>,
    private clipboardService: ClipboardService,
    private ts: ToastrService
  ) {}

  copyToClipboard(text: string) {
    this.clipboardService.copyFromContent(text);
    this.ts.success('Copied: ' + text);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
