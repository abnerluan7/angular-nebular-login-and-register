export class NbUser {

  constructor(public id?: number,
              public email?: string,
              public password?: string,
              public rememberMe?: boolean,
              public terms?: boolean,
              public confirmPassword?: string,
              public fullName?: string,
              public pis?: string,
              public cpf?: string,
              public cargo?: string,
              public equipe?: string) {
  }
}
