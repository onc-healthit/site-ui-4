import React from 'react'
import ScorecardResults from './ScorecardResults'

describe('<ScorecardResults />', () => {
  it('renders', () => {
    cy.mount(
      <ScorecardResults
        dialogState={false}
        handleCloseDialog={function (): void {
          throw new Error('Function not implemented.')
        }}
        isShowSampleDownloadButton={false}
      />
    )
  })
})
