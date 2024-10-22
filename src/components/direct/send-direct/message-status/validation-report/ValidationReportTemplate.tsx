import { CheckCircle } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
} from '@mui/material'
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
      <Box flexDirection={'row'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
        <ValidationSubMenuTemplate filteredChildren={filteredChildren} selectNode={handleSelectNode} />
        {!_.isEmpty(selectedNode) && <SelectedPartsTemplate selectedNode={selectedNode} />}
      </Box>
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
    </>
  )
}

export default ValidationReportTemplate
