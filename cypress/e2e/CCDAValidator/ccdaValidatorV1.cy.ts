import 'cypress-file-upload'

describe('C-CDA  USCDI V1 Validator form', () => {
  beforeEach(() => {
    cy.visit('/c-cda')
    cy.get(`*[title="C-CDA Validator: USCDI v1"]`).click()
    cy.get(`*[value="Sender"]`).click()
  })

  it(`should pass validation for file that meets USCDI v1 standards`, () => {
    cy.get('#uscdi-v3-full-criteria-select')
      .click()
      .then(() => {
        cy.get(`*[data-value='170.315_b1_ToC_Amb']`).click()
      })
      .then(() => {
        cy.get('#uscdi-v3-full-scenario-select').click()
      })
      .then(() => {
        cy.get(`*[data-value='170.315_b1_toc_amb_sample2_v2.pdf']`).click()
      })
    cy.get('input[name=ccdaFile]').selectFile('./cypress/e2e/testdata/CCDAValidatorV1/170.315_b1_toc_amb_sample2.xml', {
      action: 'drag-drop',
      force: true,
    })
    cy.get('#validate').click()
    cy.get('#validating-dialog-title').should('be.visible')
    cy.contains('Results', { timeout: 50000 }).should('exist')
    cy.get('#result').should('contain.text', 'Pass')
  })

  it(`should fail validation for file that contain errors or do not comply with USCDI v1 standards`, () => {
    cy.get('#uscdi-v3-full-criteria-select')
      .click()
      .then(() => {
        cy.get(`*[data-value='170.315_b1_ToC_Amb']`).click()
      })
      .then(() => {
        cy.get('#uscdi-v3-full-scenario-select').click()
      })
      .then(() => {
        cy.get(`*[data-value='170.315_b1_toc_amb_sample1_v2.pdf']`).click()
      })
    cy.get('input[name=ccdaFile]').selectFile(
      './cypress/e2e/testdata/CCDAValidatorV1/170.315_b1_toc_amb_sample1_v1.xml',
      {
        action: 'drag-drop',
        force: true,
      }
    )
    cy.get('#validate').click()
    cy.get('#validating-dialog-title').should('be.visible')
    cy.contains('Results', { timeout: 150000 }).should('exist')
    cy.get('#result').should('contain.text', 'Fail')
  })
})

describe('USCDI V1 Validator- Validate with CCDA implementation guide', () => {
  beforeEach(() => {
    cy.visit('/c-cda')
    cy.get(`*[title="C-CDA Validator: USCDI v1"]`).click()
    cy.contains(`VALIDATE WITH THE C-CDA IMPLEMENTATION GUIDE ONLY`).click()
  })

  it(`should pass validation for file that meets USCDI v1 standards`, () => {
    cy.get('input[name=ccdaFile]').selectFile('./cypress/e2e/testdata/CCDAValidatorV1/170.315_b1_toc_amb_sample2.xml', {
      action: 'drag-drop',
      force: true,
    })
    cy.get('#validate').click()
    cy.get('#validating-dialog-title').should('be.visible')
    cy.contains('Results', { timeout: 50000 }).should('exist')
    cy.get('#result').should('contain.text', 'Pass')
  })
})
