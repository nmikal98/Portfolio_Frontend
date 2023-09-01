import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as QRCode from 'qrcode-svg';
import { saveAs } from 'file-saver';

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

    const qr = new QRCode({
      content: this.urlInput,
      width: 1000, // Adjust the width for higher resolution
      height: 1000, // Adjust the height for higher resolution
    });

    const svgString = qr.svg();

    // Convert SVG to PNG and download
    this.downloadQRCode(svgString);
  }

  downloadQRCode(svgString: string) {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });

    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result as string;

      // Convert SVG to PNG using a hidden canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Trigger the download of the PNG
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'qr-code.png');
          }
        }, 'image/png');
      };

      img.src =
        'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    };

    reader.readAsText(blob);
  }
}
