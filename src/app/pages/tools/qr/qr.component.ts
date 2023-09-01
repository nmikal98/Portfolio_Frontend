import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as qr from 'qrcode';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent {
  urlInput: string = '';

  constructor(private ts: ToastrService) {}

  generateQRCode() {
    if (this.urlInput == '') {
      this.ts.error('Please enter a url');
      return;
    }
    qr.toDataURL(this.urlInput, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        this.downloadQRCode(url);
      }
    });
  }

  downloadQRCode(dataURL: string) {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
