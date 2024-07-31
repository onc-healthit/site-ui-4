import React from 'react'
import WelcomeHeader from './WelcomeHeader'

describe('<WelcomeHeader />', () => {
  it('renders', () => {
    cy.mount(<WelcomeHeader heading={''} subheading={''} description={undefined} />)
  })
})
