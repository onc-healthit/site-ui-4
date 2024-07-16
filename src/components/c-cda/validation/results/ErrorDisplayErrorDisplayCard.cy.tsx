import React from 'react'
import ErrorDisplayCard from './ErrorDisplay'

describe('<ErrorDisplayCard />', () => {
  it('renders', () => {
    cy.mount(
      <ErrorDisplayCard
        open={false}
        handleClose={function (): void {
          throw new Error('Function not implemented.')
        }}
        response={{
          error: undefined,
          errorStatus: undefined,
        }}
      />
    )
  })
})
