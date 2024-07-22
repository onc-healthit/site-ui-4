import React from 'react'
import SectionHeader from './SectionHeader'

describe('<SectionHeader />', () => {
  it('renders', () => {
    cy.mount(<SectionHeader header={''} subHeader={''} />)
  })
})
