import React from 'react'
import LinkButton from './LinkButton'

describe('<LinkButton />', () => {
  it('renders', () => {
    cy.mount(<LinkButton label={''} url={''} icon={undefined} />)
  })
})
