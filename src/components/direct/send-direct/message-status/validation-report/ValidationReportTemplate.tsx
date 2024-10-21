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
  Paper,
} from '@mui/material'
import ValidationTable from './ValidationTable'
import ValidationSubMenuTemplate from './ValidationSubMenuTemplate'
import { ValidationReport } from './ValidationReportTypes'
import { useState } from 'react'
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
      <Box flexDirection={'row'} gap={4} justifyContent={'space-between'} display={'flex'} py={4}>
        <ValidationSubMenuTemplate filteredChildren={filteredChildren} selectNode={handleSelectNode} />
        <SelectedPartsTemplate selectedNode={selectedNode} />
      </Box>
      <Paper>
        {version === '' && <ValidationTable selectedNodeDetails={selectedNode?.details ?? null} />}
        {version === 'USCDIV2' && <ValidationTable selectedNodeDetails={selectedNode?.svapdetails ?? null} />}
      </Paper>
    </>
  )
}

export default ValidationReportTemplate
