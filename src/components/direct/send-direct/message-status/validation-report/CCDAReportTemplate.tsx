import ValidatorResultsSummary from '@/components/c-cda/validation/results/ValidationResultsSummary'
import { CCDAReport } from './ValidationReportTypes'
import { useRef } from 'react'
import _ from 'lodash'
import XDMResultsTemplate from '@/components/direct/validators/XDMResultsTemplate'

interface CCDAReportTemplateProps {
  ccdaReport: CCDAReport[] | null
}
const CCDAReportTemplate = ({ ccdaReport }: CCDAReportTemplateProps) => {
  console.log(ccdaReport)
  const scrollRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const mdhtErrorRef = useRef<HTMLDivElement>(null)
  const mdhtWarningRef = useRef<HTMLDivElement>(null)
  const mdhtInfoRef = useRef<HTMLDivElement>(null)
  const vocabularyErrorRef = useRef<HTMLDivElement>(null)
  const vocabularyWarningRef = useRef<HTMLDivElement>(null)
  const vocabularyInfoRef = useRef<HTMLDivElement>(null)
  const referenceErrorRef = useRef<HTMLDivElement>(null)
  const referenceWarningRef = useRef<HTMLDivElement>(null)
  const referenceInfoRef = useRef<HTMLDivElement>(null)
  const originalCCDARef = useRef<HTMLDivElement>(null)
  return (
    <>
      {ccdaReport && ccdaReport.length > 0 && _.has(ccdaReport[0]?.ccdaReport, 'ccdaRType') && (
        <ValidatorResultsSummary
          results={ccdaReport ? ccdaReport[0]?.ccdaReport || {} : {}}
          scrollRef={scrollRef}
          summaryRef={summaryRef}
          mdhtErrorRef={mdhtErrorRef}
          mdhtWarningRef={mdhtWarningRef}
          mdhtInfoRef={mdhtInfoRef}
          vocabularyErrorRef={vocabularyErrorRef}
          vocabularyWarningRef={vocabularyWarningRef}
          vocabularyInfoRef={vocabularyInfoRef}
          referenceErrorRef={referenceErrorRef}
          referenceWarningRef={referenceWarningRef}
          referenceInfoRef={referenceInfoRef}
          originalCCDARef={originalCCDARef}
          criteria={''}
        />
      )}
      {ccdaReport && ccdaReport.length > 0 && _.startsWith(ccdaReport[0]?.filename, 'XDM') && (
        <XDMResultsTemplate response={ccdaReport[0].ccdaReport} />
      )}
    </>
  )
}

export default CCDAReportTemplate
