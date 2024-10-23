import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import MessageTemplate from './MessageTemplate'

import { CCDAReport, RawContent, ReportProps, ValidationReport } from './ValidationReportTypes'
import _ from 'lodash'
import ValidationReportTemplate from './ValidationReportTemplate'
import TabsComponent, { TabInputs } from '@/components/shared/TabsComponent'
import CCDAReportTemplate from './CCDAReportTemplate'

const filterChildren = (
  node: ValidationReport,
  condition: (node: ValidationReport) => boolean,
  parent: ValidationReport | null = null
) => {
  let result: { node: ValidationReport; parent: ValidationReport | null }[] = []

  if (condition(node)) {
    result.push({ node, parent })
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    node.children.forEach((child) => {
      result = result.concat(filterChildren(child, condition, node))
    })
  }

  return result
}
const ValidationReportLayout = (validationReport: ValidationReport, version: string) => {
  const condition = (node: ValidationReport) => _.has(node, 'contentType')
  const filteredChildren = filterChildren(validationReport, condition)
  //console.log('filteredChildren', filteredChildren)
  return (
    <Container>
      <Box flexDirection={'column'} justifyContent={'space-between'} display={'flex'} pb={2}>
        <ValidationReportTemplate filteredChildren={filteredChildren} version={version} />
      </Box>
    </Container>
  )
}

const RawContentLayout = (validationReportRawContent: RawContent) => (
  <Container>
    <Box flexDirection={'column'} justifyContent={'space-between'} display={'flex'} pb={2}>
      <MessageTemplate rawContent={validationReportRawContent} />
    </Box>
  </Container>
)
const ccdaReportTabName = (ccdaReport: CCDAReport[]) => {
  if (_.isEqual(ccdaReport[0].ccdaReport.ccdaRType, 'r1')) {
    return 'CCDA Validation R1.1'
  } else if (_.isEqual(ccdaReport[0].ccdaReport.ccdaRType, 'r2')) {
    return 'CCDA Validation R2.1'
  } else if (_.startsWith(ccdaReport[0].filename, 'XDM_')) {
    return 'XDM Validation'
  } else {
    return 'CCDA Validation'
  }
}
const ReportTabs = ({ validationReport, validationReportRawContent, ccdaReport }: ReportProps) => {
  const [reportTabs, setReportTabs] = useState<TabInputs[]>([])

  useEffect(() => {
    const newTabs: TabInputs[] = []
    let currentIndex = 0
    if (!_.isEmpty(validationReport)) {
      newTabs.push(
        {
          tabName: 'Validation Report',
          tabIndex: currentIndex++,
          tabPanel: ValidationReportLayout(validationReport, ''),
        },
        {
          tabName: 'Validation Report USCDI V2',
          tabIndex: currentIndex++,
          tabPanel: ValidationReportLayout(validationReport, 'USCDIV2'),
        }
      )
    }
    if (ccdaReport.length > 0) {
      const tabName = ccdaReportTabName(ccdaReport)

      newTabs.push({
        tabName: tabName,
        tabIndex: currentIndex++,
        tabPanel: <CCDAReportTemplate ccdaReport={ccdaReport} />,
      })
    }
    if (validationReportRawContent.length > 0) {
      validationReportRawContent.map((item) => {
        newTabs.push({ tabName: item.filename, tabIndex: currentIndex++, tabPanel: RawContentLayout(item) })
      })
    }
    setReportTabs(newTabs)
  }, [ccdaReport, validationReport, validationReportRawContent])

  return <TabsComponent selectedTab={''} tabs={reportTabs} variant="scrollable" />
}

export default ReportTabs
