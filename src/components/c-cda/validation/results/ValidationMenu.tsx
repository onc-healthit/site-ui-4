import React from 'react'
import { MenuItem, List } from '@mui/material'
import _ from 'lodash'
import ValidatorMenuSection from './ValidationMenuSection'
interface ValidatorMenuProps {
  results: object
  summaryRef: React.RefObject<HTMLDivElement>
  mdhtErrorRef: React.RefObject<HTMLDivElement>
  mdhtWarningRef: React.RefObject<HTMLDivElement>
  mdhtInfoRef: React.RefObject<HTMLDivElement>
  vocabularyErrorRef: React.RefObject<HTMLDivElement>
  vocabularyWarningRef: React.RefObject<HTMLDivElement>
  vocabularyInfoRef: React.RefObject<HTMLDivElement>
  referenceErrorRef: React.RefObject<HTMLDivElement>
  referenceWarningRef: React.RefObject<HTMLDivElement>
  referenceInfoRef: React.RefObject<HTMLDivElement>
  originalCCDARef: React.RefObject<HTMLDivElement>
  criteria: string
}
export type ResultMetaData = {
  type: string
  count: number
}
export interface ResultMetaDataProps {
  resultMetaData: ResultMetaData[]
  mdhtErrorRef: React.RefObject<HTMLDivElement>
  mdhtWarningRef: React.RefObject<HTMLDivElement>
  mdhtInfoRef: React.RefObject<HTMLDivElement>
  vocabularyErrorRef: React.RefObject<HTMLDivElement>
  vocabularyWarningRef: React.RefObject<HTMLDivElement>
  vocabularyInfoRef: React.RefObject<HTMLDivElement>
  referenceErrorRef: React.RefObject<HTMLDivElement>
  referenceWarningRef: React.RefObject<HTMLDivElement>
  referenceInfoRef: React.RefObject<HTMLDivElement>
  criteria: string
}

const ResultsSection = ({
  resultMetaData,
  mdhtErrorRef,
  mdhtInfoRef,
  mdhtWarningRef,
  vocabularyErrorRef,
  vocabularyInfoRef,
  vocabularyWarningRef,
  referenceErrorRef,
  referenceInfoRef,
  referenceWarningRef,
  criteria,
}: ResultMetaDataProps) => {
  const ccdaMDHTConformanceMetaData = resultMetaData.filter((result) => result?.type.includes('C-CDA MDHT Conformance'))

  const sccVocabularyMetaData = resultMetaData.filter((result) =>
    result?.type.includes('S&CC Vocabulary Validation Conformance')
  )
  const sccReferenceCCDAMetaData = resultMetaData.filter((result) =>
    result?.type.includes('S&CC Reference C-CDA Validation')
  )
  return (
    <>
      <ValidatorMenuSection
        resultMetaData={ccdaMDHTConformanceMetaData}
        title={'C-CDA IG Conformance'}
        errorRef={mdhtErrorRef}
        warningRef={mdhtWarningRef}
        infoRef={mdhtInfoRef}
      />
      {!_.isEqual(criteria, 'C-CDA_IG_Only') && (
        <>
          <ValidatorMenuSection
            resultMetaData={sccVocabularyMetaData}
            title={'S&CC Vocabulary Validation Conformance'}
            errorRef={vocabularyErrorRef}
            warningRef={vocabularyWarningRef}
            infoRef={vocabularyInfoRef}
          />
        </>
      )}
      {!(_.isEqual(criteria, 'C-CDA_IG_Only') || _.isEqual(criteria, 'C-CDA_IG_Plus_Vocab')) && (
        <>
          <ValidatorMenuSection
            resultMetaData={sccReferenceCCDAMetaData}
            title={'S&CC Reference C-CDA Validation'}
            errorRef={referenceErrorRef}
            warningRef={referenceWarningRef}
            infoRef={referenceInfoRef}
          />
        </>
      )}
    </>
  )
}
const ValidatorMenu = ({
  results,
  summaryRef,
  mdhtErrorRef,
  mdhtWarningRef,
  mdhtInfoRef,
  vocabularyErrorRef,
  vocabularyInfoRef,
  vocabularyWarningRef,
  referenceErrorRef,
  referenceInfoRef,
  referenceWarningRef,
  originalCCDARef,
  criteria,
}: ValidatorMenuProps) => {
  const resultsMetaData = _.get(results, 'resultsMetaData')
  const resultMetaData = _.get(resultsMetaData, 'resultMetaData')
  const onScroll = (ref: React.RefObject<HTMLDivElement>) => {
    //hideOriginalCCDA
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <List>
        <MenuItem sx={{ fontWeight: 'bold', py: 1 }} onClick={() => onScroll(summaryRef)}>
          Summary & Results
        </MenuItem>
        {resultMetaData ? (
          <ResultsSection
            resultMetaData={resultMetaData}
            mdhtErrorRef={mdhtErrorRef}
            mdhtWarningRef={mdhtWarningRef}
            mdhtInfoRef={mdhtInfoRef}
            vocabularyErrorRef={vocabularyErrorRef}
            vocabularyWarningRef={vocabularyWarningRef}
            vocabularyInfoRef={vocabularyInfoRef}
            referenceErrorRef={referenceErrorRef}
            referenceWarningRef={referenceWarningRef}
            referenceInfoRef={referenceInfoRef}
            criteria={criteria}
          />
        ) : null}

        <MenuItem sx={{ fontWeight: 'bold' }} onClick={() => onScroll(originalCCDARef)}>
          Submitted C-CDA Document
        </MenuItem>
      </List>
    </>
  )
}

export default ValidatorMenu
