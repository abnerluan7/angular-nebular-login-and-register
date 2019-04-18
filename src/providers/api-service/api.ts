import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { NbAuthJWTToken, NbAuthService } from '../../app/auth';


@Injectable()
export class ApiProvider {

  user = {};

  constructor(public http: Http, private authService: NbAuthService) {
  }

  loadHeaders() {
    const headers = new Headers();
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token['token'] // here we receive a payload from the token and assigne it to our `user` variable 
          headers.append('Authorization',`Bearer ${this.user}`);
        }
    });
    return Promise.resolve(headers);
  }

  post(url: string, params: any){
    return new Promise((resolve, reject) => {
      const fullUrl: string = `${environment.url}${url}`;
      return this.loadHeaders().then((headers) => {
        const options = new RequestOptions({ headers });
        return this.http.post(fullUrl, params, options).subscribe(
          response => {
            return resolve(response.json());
          },
          error => {
            return reject(error.json());
          }
        );
      });  
    });
  }

  get(url: string){
    return new Promise((resolve, reject) =>{
      const fullUrl: string = `${environment.url}${url}`;
      return this.loadHeaders().then((headers) => {
        const options = new RequestOptions({ headers });
        return this.http.get(fullUrl, options).subscribe(
          response =>{
            return resolve(response.json());
          },
          error =>{
            return reject(error.json());
          }
        );
      });
    });
  }
}
