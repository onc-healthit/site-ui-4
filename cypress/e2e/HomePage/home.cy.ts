describe('Home Page - ONC Certification Tools', () => {
  before(() => {
    cy.visit('/')
  })
  const links = [
    { text: 'Inferno FHIR Testing', url: 'https://inferno.healthit.gov/' },
    { text: 'C-CDA Testing', url: '/c-cda' },
    { text: 'Direct Project Tooling', url: `/direct` },
    { text: 'Clinical Quality Measure Testing', url: `/cqmt` },
    { text: 'Electronic Prescribing (eRX) Tool', url: 'https://erx.healthit.gov/erx/' },
    { text: 'Public Health Reporting', url: `/public-health-reporting` },
    { text: 'Alternative Test Methods', url: `https://hl7v2-iz-cdc-testing.nist.gov/iztool/#/home` },
  ]

  links.forEach((link) => {
    it(`should have correct link for ${link.text}`, () => {
      cy.visit('/')
      cy.get(`*[title="${link.text}"]`)
        .parent()
        .parent()
        .then(function ($a) {
          const href = $a.prop('href')
          expect(href).to.contain(link.url)
        })
    })
  })
})

describe('Home Page - General Testing Resources', () => {
  before(() => {
    cy.visit('/')
  })
  const links = [
    { text: 'CPOE Evaluation Tool', url: 'https://www.leapfroggroup.org/survey-materials/prepare-cpoe-tool' },
    { text: 'IHE Testing Tools', url: 'https://www.ihe.net/testing/testing_tools' },
    { text: 'Inferno Resource Validator', url: `https://inferno.healthit.gov/validator/` },
    { text: 'Lantern Project', url: `https://lantern.healthit.gov/?tab=dashboard_tab` },
  ]

  links.forEach((link) => {
    it(`should have correct link for ${link.text}`, () => {
      cy.visit('/')
      cy.get(`*[title="${link.text}"]`)
        .parent()
        .parent()
        .then(function ($a) {
          const href = $a.prop('href')
          expect(href).to.contain(link.url)
        })
    })
  })
})

describe('Home Page - Industry Testing Tools', () => {
  before(() => {
    cy.visit('/')
  })
  const links = [
    { text: 'HL7 Tools', url: '/industry-resources#hl7' },
    { text: 'Reference Data', url: '/industry-resources#rd' },
    { text: 'Implementation Guides', url: `/industry-resources#ig` },
  ]

  links.forEach((link) => {
    it(`should have correct link for ${link.text}`, () => {
      cy.visit('/')
      cy.get(`*[title="${link.text}"]`)
        .parent()
        .parent()
        .then(function ($a) {
          const href = $a.prop('href')
          expect(href).to.contain(link.url)
        })
    })
  })
})
