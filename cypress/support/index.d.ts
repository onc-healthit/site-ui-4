declare namespace Cypress {
  interface Chainable<Subject> {
    loginByOkta(username: string, password: string): Chainable<any>
  }
}

declare namespace Cypress {
  interface Chainable<Subject> {
    logOut(): Chainable<Subject>
  }
}

declare namespace Cypress {
  interface Chainable<Subject> {
    exists(selector): Chainable<Subject>
  }
}
