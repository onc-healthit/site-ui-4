import React from 'react'
import SiteHome from './SiteHome'

describe('<SiteHome />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SiteHome />)
  })
})
