import React from 'react'
import CircularProgressWithLabelAndBackground from './CircularProgressWithLabelAndBackground'

describe('<CircularProgressWithLabelAndBackground />', () => {
  it('renders', () => {
    cy.mount(<CircularProgressWithLabelAndBackground progressValue={0} labelValue={''} labelAndProgressColor={''} />)
  })
})
