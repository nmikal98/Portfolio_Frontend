import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // File transfer routes

  uploadFile(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/api/v1/files/upload`, body);
  }

  downloadFile(code: number): Observable<any> {
    return this.http.get(`${BASEURL}/api/v1/files/${code}`);
  }

  // Clipboard routes

  uploadNote(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/api/v1/clipboard/upload`, body);
  }

  downloadNote(code: number): Observable<any> {
    return this.http.get(`${BASEURL}/api/v1/clipboard/${code}`);
  }

  // Mail Routes

  sendEmail(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/api/v1/mail`, body);
  }
}
