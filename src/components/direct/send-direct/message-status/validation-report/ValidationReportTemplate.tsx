import { Box, Paper } from '@mui/material'
import ValidationTable from './ValidationTable'
import ValidationSubMenuTemplate, { extractContentType } from './ValidationSubMenuTemplate'
import { ValidationReport } from './ValidationReportTypes'
import { useState } from 'react'
import _ from 'lodash'
import SelectedPartsTemplate from './ValidationSelectedPartsTemplate'
export type Child = {
  node: ValidationReport
  parent: ValidationReport | null
}
export interface FilteredChildrenProps {
  filteredChildren: Child[]
  version: string
}
const ValidationReportTemplate = ({ filteredChildren, version }: FilteredChildrenProps) => {
  const [selectedNode, setSelectedNode] = useState<ValidationReport | null>(null)

  const handleSelectNode = (node: ValidationReport) => {
    setSelectedNode(node)
    console.log('selectedNode', node)
  }
  return (
    <>
      <Box width={'100%'} display={'flex'} flexDirection={'column'}>
        <Box
          gap={4}
          justifyContent={'space-between'}
          display={'flex'}
          py={4}
          sx={{
            '@media (max-width:900px)': {
              flexDirection: 'column', // Adjust the layout for small screens
            },
            '@media (min-width:901px)': {
              flexDirection: 'row', // Keep it as row for larger screens
            },
          }}
        >
          <ValidationSubMenuTemplate filteredChildren={filteredChildren} selectNode={handleSelectNode} />
          {!_.isEmpty(selectedNode) && <SelectedPartsTemplate selectedNode={selectedNode} />}
        </Box>
        <Paper>
          {version === '' && !_.isEmpty(selectedNode) && (
            <ValidationTable
              selectedNodeDetails={selectedNode?.details ?? null}
              selectedContentType={extractContentType(selectedNode.contentType)}
              version={version}
            />
          )}
          {version === 'USCDIV2' && !_.isEmpty(selectedNode) && (
            <ValidationTable
              selectedNodeDetails={selectedNode?.svapdetails ?? null}
              selectedContentType={extractContentType(selectedNode.contentType)}
              version={version}
            />
          )}
        </Paper>
      </Box>
    </>
  )
}

export default ValidationReportTemplate
