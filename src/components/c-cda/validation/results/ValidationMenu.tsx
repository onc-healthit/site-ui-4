import React from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails, MenuItem, List, Avatar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// Assuming palette is imported correctly from '@/styles/palette'
import palette from '@/styles/palette'
import _ from 'lodash'
import ValidatorMenuSection from './ValidationMenuSection'
interface ValidatorMenuProps {
  results: object
}
export type ResultMetaData = {
  type: string
  count: number
}
export interface ResultMetaDataProps {
  resultMetaData: ResultMetaData[]
}
const ResultsSection = ({ resultMetaData }: ResultMetaDataProps) => {
  const ccdaMDHTConformanceMetaData = resultMetaData.filter((result) => result?.type.includes('C-CDA MDHT Conformance'))

  const sccVocabularyMetaData = resultMetaData.filter((result) =>
    result?.type.includes('S&CC Vocabulary Validation Conformance')
  )
  const sccReferenceCCDAMetaData = resultMetaData.filter((result) =>
    result?.type.includes('S&CC Reference C-CDA Validation')
  )
  return (
    <>
      <ValidatorMenuSection resultMetaData={ccdaMDHTConformanceMetaData} title={'C-CDA MDHT Conformance'} />
      <ValidatorMenuSection resultMetaData={sccVocabularyMetaData} title={'S&CC Vocabulary Validation Conformance'} />
      <ValidatorMenuSection resultMetaData={sccReferenceCCDAMetaData} title={'S&CC Reference C-CDA Validation'} />
    </>
  )
}
const ValidatorMenu = ({ results }: ValidatorMenuProps) => {
  const resultsMetaData = _.get(results, 'resultsMetaData')
  const resultMetaData = _.get(resultsMetaData, 'resultMetaData')

  return (
    <>
      <List>
        <MenuItem sx={{ fontWeight: 'bold', py: 1 }}>Summary & Results</MenuItem>
        {resultMetaData ? <ResultsSection resultMetaData={resultMetaData} /> : null}

        <MenuItem sx={{ fontWeight: 'bold' }}>Original C-CDA</MenuItem>
      </List>
    </>
  )
}

export default ValidatorMenu
