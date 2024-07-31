import React from 'react'
import BannerBox from './BannerBox'

describe('<BannerBox />', () => {
  it('renders', () => {
    cy.mount(<BannerBox heading={''} description={undefined} />)
  })
})
