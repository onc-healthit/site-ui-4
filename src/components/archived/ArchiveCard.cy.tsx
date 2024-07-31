import React from 'react'
import ArchiveCard from './ArchiveCard'

describe('<ArchiveCard />', () => {
  it('renders', () => {
    cy.mount(<ArchiveCard cardHeader={''} description={''} />)
  })
})
