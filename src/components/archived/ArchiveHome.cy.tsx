import React from 'react'
import ArchiveHome from './ArchiveHome'

describe('<ArchiveHome />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ArchiveHome />)
  })
})
