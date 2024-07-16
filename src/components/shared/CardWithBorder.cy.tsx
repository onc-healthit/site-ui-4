import React from 'react'
import CardWithBorder from './CardWithBorder'

describe('<CardWithBorder />', () => {
  it('renders', () => {
    cy.mount(<CardWithBorder cardHeader={''} buttonTitle={''} buttonIcon={undefined} />)
  })
})
