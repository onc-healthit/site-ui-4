import 'cypress-file-upload'

describe('C-CDA USCDI V3 Validator form', () => {
  before(() => {
    cy.visit('/c-cda')
    cy.get(`*[title="C-CDA Validator: USCDI v3"]`).click()
  })
  it(`should have system selector`, () => {
    cy.get(`*[value="Sender"]`).should('exist')
    cy.get(`*[value="Receiver"]`).should('exist')
  })

  it(`should have validation criteria dropdown`, () => {
    cy.get('#uscdi-v3-full-criteria-select').should('exist')
  })

  it(`should have scenario file dropdown`, () => {
    cy.get('#uscdi-v3-full-scenario-select').should('exist')
  })

  it(`should have options to upload C-CDA file`, () => {
    cy.get(`*[name="ccdaFile"]`).should('exist')
  })

  it(`should have VALIDATE button`, () => {
    cy.get('#validate').should('exist')
    cy.get('#validate').should('have.attr', 'disabled')
  })

  it(`should have DOWNLOAD SELECTED SCENARIO FILE button`, () => {
    cy.get('#download-selected-scenario-file').should('exist')
  })

  it(`should have DOWNLOAD ALL SCENARIO FILES button`, () => {
    cy.get('#download-all-scenario-files').should('exist')
  })
})

describe('C-CDA USCDI V3 Validator form', () => {
  beforeEach(() => {
    cy.visit('/c-cda')
    cy.get(`*[title="C-CDA Validator: USCDI v3"]`).click()
  })

  it(`should have all expected options for validation criteria for Sender system selection`, () => {
    const expectedCriteriaForSender = [
      '170.315_b1_ToC_Amb',
      '170.315_b1_ToC_Inp',
      '170.315_b2_CIRI_Amb',
      '170.315_b2_CIRI_Inp',
      '170.315_b7_DS4P_Amb',
      '170.315_b7_DS4P_Inp',
      '170.315_b9_CP_Amb',
      '170.315_b9_CP_Inp',
      '170.315_e1_VDT_Amb',
      '170.315_e1_VDT_Inp',
      '170.315_g9_APIAccess_Amb',
      '170.315_g9_APIAccess_Inp',
      'C-CDA_IG_Only',
      'C-CDA_IG_Plus_Vocab',
      'Gold_Samples_For_Practice',
    ]
    cy.get(`*[value="Sender"]`).click()
    cy.get('#uscdi-v3-full-criteria-select').click()
    cy.get('*[aria-labelledby="uscdi-v3-full-criteria-input-label"]')
      .children()
      .each(($li, index) => {
        const optionValue = $li.attr('data-value')
        expect(optionValue).to.equal(expectedCriteriaForSender[index])
      })
  })

  it(`should have all expected options for validation criteria for Receiver system selection`, () => {
    const expectedCriteriaForReceiver = [
      '170.315_b1_ToC_Amb',
      '170.315_b1_ToC_Inp',
      '170.315_b2_CIRI_Amb',
      '170.315_b2_CIRI_Inp',
      '170.315_b8_DS4P_Amb',
      '170.315_b8_DS4P_Inp',
      '170.315_b9_CP_Amb',
      '170.315_b9_CP_Inp',
      'NegativeTesting_CarePlan',
      'NegativeTesting_USCDI',
    ]
    cy.get(`*[value="Receiver"]`).click()
    cy.get('#uscdi-v3-full-criteria-select').click()
    cy.get('*[aria-labelledby="uscdi-v3-full-criteria-input-label"]')
      .children()
      .each(($li, index) => {
        const optionValue = $li.attr('data-value')
        expect(optionValue).to.equal(expectedCriteriaForReceiver[index])
      })
  })
})

describe('C-CDA USCDI V3 Validator- Sender', () => {
  beforeEach(() => {
    cy.visit('/c-cda')
    cy.get(`*[title="C-CDA Validator: USCDI v3"]`).click()
    cy.get(`*[value="Sender"]`).click()
  })

  it.skip(`should throw error for file size more than 1 MB`, () => {
    cy.get('#uscdi-v3-full-criteria-select')
      .click()
      .then(() => {
        cy.get(`*[data-value='170.315_b1_ToC_Amb']`).click()
      })
      .then(() => {
        cy.get('#uscdi-v3-full-scenario-select').click()
      })
      .then(() => {
        cy.get(`*[data-value='170.315_b1_toc_amb_svap_uscdiv3_sample1_v1.pdf']`).click()
      })
    cy.get('input[name=ccdaFile]').selectFile('./cypress/e2e/testdata/CCDAValidatorV3/edt_3MB.xml', {
      action: 'drag-drop',
      force: true,
    })
    cy.get('#validate').click()
    cy.get('#validating-dialog-error-title', { timeout: 10000 })
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Oh no!Looks like there was an error.')
      })
  })

  it(`should throw appropriate error for invalid or malformed CCDA file`, () => {
    cy.get('#uscdi-v3-full-criteria-select')
      .click()
      .then(() => {
        cy.get(`*[data-value='170.315_b1_ToC_Amb']`).click()
      })
      .then(() => {
        cy.get('#uscdi-v3-full-scenario-select').click()
      })
      .then(() => {
        cy.get(`*[data-value='170.315_b1_toc_amb_svap_uscdiv3_sample1_v1.pdf']`).click()
      })
    cy.get('input[name=ccdaFile]').selectFile(
      './cypress/e2e/testdata/CCDAValidatorV3/parsing_error_invalid_content.xml',
      {
        action: 'drag-drop',
        force: true,
      }
    )
    cy.get('#validate').click()
    cy.get('#validating-dialog-error-title', { timeout: 10000 })
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Oh no!Looks like there was an error.')
      })
  })

  it(`should pass validation for file that meets USCDI v3 standards`, () => {
    cy.get('#uscdi-v3-full-criteria-select')
      .click()
      .then(() => {
        cy.get(`*[data-value='170.315_b1_ToC_Amb']`).click()
      })
      .then(() => {
        cy.get('#uscdi-v3-full-scenario-select').click()
      })
      .then(() => {
        cy.get(`*[data-value='170.315_b1_toc_amb_svap_uscdiv3_sample1_v1.pdf']`).click()
      })
    cy.get('input[name=ccdaFile]').selectFile(
      './cypress/e2e/testdata/CCDAValidatorV3/170.315_b1_toc_amb_svap_uscdiv3_sample1.xml',
      {
        action: 'drag-drop',
        force: true,
      }
    )
    cy.get('#validate').click()
    cy.get('#validating-dialog-title').should('be.visible')
    cy.contains('Results', { timeout: 150000 }).should('exist')
    cy.get('#result').should('contain.text', 'Pass')
  })

  it(`should fail validation for file that contain errors or do not comply with USCDI v3 standards`, () => {
    cy.get('#uscdi-v3-full-criteria-select')
      .click()
      .then(() => {
        cy.get(`*[data-value='170.315_b1_ToC_Amb']`).click()
      })
      .then(() => {
        cy.get('#uscdi-v3-full-scenario-select').click()
      })
      .then(() => {
        cy.get(`*[data-value='170.315_b1_toc_amb_svap_uscdiv3_sample1_v1.pdf']`).click()
      })
    cy.get('input[name=ccdaFile]').selectFile(
      './cypress/e2e/testdata/CCDAValidatorV3/MedicationClinicalDrug_useOfUpdatedCode_errors.xml',
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

describe('C-CDA USCDI V3 Validator- Receiver', () => {
  beforeEach(() => {
    cy.visit('/c-cda')
    cy.get(`*[title="C-CDA Validator: USCDI v3"]`).click()
    cy.get(`*[value="Receiver"]`).click()
  })

  it(`should pass validation for file that meets USCDI v3 standards`, () => {
    cy.get('#uscdi-v3-full-criteria-select')
      .click()
      .then(() => {
        cy.get(`*[data-value='170.315_b1_ToC_Inp']`).click()
      })
      .then(() => {
        cy.get('#uscdi-v3-full-scenario-select').click()
      })
      .then(() => {
        cy.get(`*[data-value='170.315_b1_toc_inp_ccd_r11_svap_uscdiv3_v1.html']`).click()
      })
    cy.get('input[name=ccdaFile]').selectFile(
      './cypress/e2e/testdata/CCDAValidatorV3/170.315_b1_toc_amb_svap_uscdiv3_sample1.xml',
      {
        action: 'drag-drop',
        force: true,
      }
    )
    cy.get('#validate').click()
    cy.get('#validating-dialog-title').should('be.visible')
    cy.contains('Results', { timeout: 50000 }).should('exist')
    cy.get('#result').should('contain.text', 'Pass')
  })
})

describe('C-CDA USCDI V3 Validator- Validate with CCDA implementation guide', () => {
  beforeEach(() => {
    cy.visit('/c-cda')
    cy.get(`*[title="C-CDA Validator: USCDI v3"]`).click()
    cy.contains(`VALIDATE WITH THE C-CDA IMPLEMENTATION GUIDE ONLY`).click()
  })

  it(`should pass validation for file that meets USCDI v3 standards`, () => {
    cy.get('input[name=ccdaFile]').selectFile(
      './cypress/e2e/testdata/CCDAValidatorV3/170.315_b1_toc_amb_svap_uscdiv3_sample1.xml',
      {
        action: 'drag-drop',
        force: true,
      }
    )
    cy.get('#validate').click()
    cy.get('#validating-dialog-title').should('be.visible')
    cy.contains('Results', { timeout: 50000 }).should('exist')
    cy.get('#result').should('contain.text', 'Pass')
  })
})
