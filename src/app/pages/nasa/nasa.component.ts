import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LargeImageDialogComponent } from '../../large-image-dialog/large-image-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

export interface MarsRoverPhoto {
  id: number;
  img_src: string;
}

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.scss'],
})
export class NasaComponent implements OnInit {
  private readonly apiKey = 'PENipHpBgNepcHkBMHhxW279GEr6Y4moZD95dfpS ';
  private readonly marsRoverApiUrl =
    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
  private readonly apodApiUrl = 'https://api.nasa.gov/planetary/apod';
  private readonly epicUrl = 'https://api.nasa.gov/EPIC/api/natural/images';

  public marsRoverPhotos: MarsRoverPhoto[] = [];
  public epicImages: any[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getRoverPhotos().subscribe((data) => {
      this.marsRoverPhotos = data;
      this.spinner.hide();
    });

    this.getEpicImages();
  }

  getEpicImages() {
    this.spinner.show();
    this.http
      .get<any[]>(
        `https://api.nasa.gov/EPIC/api/natural?api_key=${this.apiKey}`
      )
      .subscribe((data) => {
        for (let image of data) {
          let date = image.date;
          let imageFilename = image.image;
          let year = date.substring(0, 4);
          let month = date.substring(5, 7);
          let day = date.substring(8, 10);
          let imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${imageFilename}.png?api_key=${this.apiKey}`;
          this.epicImages.push({ url: imageUrl, caption: image.caption });
        }

        this.spinner.hide();
      });
  }

  getRoverPhotos(): Observable<any> {
    let sol = 3000;
    let url = `${this.marsRoverApiUrl}?sol=${sol}&api_key=${this.apiKey}`;

    return new Observable((observer) => {
      const checkPhotos = () => {
        this.http.get(url).subscribe(
          (data: any) => {
            if (data.photos.length > 0) {
              observer.next(data.photos.slice(0, 100));
              observer.complete();
            } else {
              sol--;
              url = `${this.marsRoverApiUrl}?sol=${sol}&api_key=${this.apiKey}`;
              checkPhotos();
            }
          },
          (error) => {
            observer.error(error);
          }
        );
      };

      checkPhotos();
    });
  }

  openDialog(imageUrl: string): void {
    this.dialog.open(LargeImageDialogComponent, {
      data: { imageUrl: imageUrl },
    });
  }
}
