import React from 'react'
import DocsCard from './DocsCard'

describe('<DocsCard />', () => {
  it('renders', () => {
    cy.mount(<DocsCard header={''} content={undefined} />)
  })
})
