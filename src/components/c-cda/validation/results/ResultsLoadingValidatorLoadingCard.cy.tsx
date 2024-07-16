import React from 'react'
import ValidatorLoadingCard from './ResultsLoading'

describe('<ValidatorLoadingCard />', () => {
  it('renders', () => {
    cy.mount(
      <ValidatorLoadingCard
        open={false}
        handleClose={function (): void {
          throw new Error('Function not implemented.')
        }}
        estimatedValidationTime={0}
        fileName={''}
      />
    )
  })
})
