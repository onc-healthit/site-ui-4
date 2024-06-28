/// <reference types="cypress" />

const exists = (selector: string) => {
  return cy.get('body').then(($body: JQuery<HTMLElement>) => {
    return new Cypress.Promise<boolean>((resolve) => {
      if ($body.find(selector).length) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

// const loginToOkta = (username: string, password: string) => {
//   const name = 'Automation Testerson'
//   Cypress.log({
//     displayName: 'OKTA LOGIN',
//     message: [`🔐 Authenticating | ${username}`],
//     autoEnd: false,
//   })

//   cy.visit('/')
//   cy.contains('Sign in with Okta').click()
//   cy.origin(
//     Cypress.env('okta_domain'),
//     { args: { username, password } },
//     ({ username, password }) => {
//       cy.get('input[name="identifier"]').clear().type(username)
//       cy.get('[type="submit"]').click()
//       // Check if the element exists
//       cy.get('body').then(($body: JQuery<HTMLElement>) => {
//         new Cypress.Promise<boolean>((resolve) => {
//           if ($body.find('[class="button select-factor link-button"]').length) {
//             cy.get('*[class="button select-factor link-button"]').click()
//             cy.get('input[name="credentials.passcode"]').type(password, {
//               log: false,
//             })
//             cy.get('[type="submit"]').click()
//           } else {
//             cy.get('input[name="credentials.passcode"]').type(password, {
//               log: false,
//             })
//             cy.get('[type="submit"]').click()
//           }
//         })
//       })
//     }
//   )
//   cy.get('#app-header', { timeout: 10000 }).should('contain', name)
// }

// const logOut = () => {
//   Cypress.log({
//     displayName: 'OKTA LOGOUT',
//     message: [`Logging out`],
//     autoEnd: false,
//   })
//   cy.get('#logout').click()
//   cy.origin('https://izgateway1.oktapreview.com', () => {
//     cy.url({ timeout: 20000 }).should('contain', Cypress.env('okta_domain'))
//   })
// }

// Cypress.Commands.add('loginByOkta', (username: string, password: string) => {
//   loginToOkta(username, password)
// })
// Cypress.Commands.add('logOut', () => {
//   logOut()
// })
Cypress.Commands.add('exists', (selector: string) => {
  exists(selector)
})
