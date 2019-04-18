import { Injectable } from '@angular/core';
import { ApiProvider } from '../api-service/api';
import { authEnvironment } from '../../environments/auth-environment'

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class UserServiceProvider {

  constructor(private api: ApiProvider) {}

  async userJWT() {
    try {
      const response = await this.api.get(authEnvironment.user);
      return Promise.resolve(response);
    }
    catch (response_1) {
      return Promise.reject(response_1);
    }
  }

  async registrosPonto() {
    try {
      const response = await this.api.get(authEnvironment.registers);
      return Promise.resolve(response);
    }
    catch (response_1) {
      return Promise.reject(response_1);
    }
  }


  async pontoRegister() {
    try {
      const response = await this.api.post(authEnvironment.regist,'');
      return Promise.resolve(response);
    }
    catch (response_1) {
      return Promise.reject(response_1);
    }
  }
}
