import React from 'react'
import CriteriaCard from './CardWithImage'

describe('<CriteriaCard />', () => {
  it('renders', () => {
    cy.mount(
      <CriteriaCard
        title={''}
        cardImage={''}
        cardHeader={''}
        description={''}
        pathname={''}
        maxWidth={0}
        imageWidth={''}
      />
    )
  })
})
