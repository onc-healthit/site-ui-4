import { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import { Box, Tabs, Tab, Container, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import MessageTemplate from './MessageTemplate'
import ValidationSolutions from './ValidationSelectedPartsTemplate'
import ValidationSubMenuTemplate from './ValidationSubMenuTemplate'
import ValidationTable from './ValidationTable'
import { RawContent, ReportProps, ValidationReport } from './ValidationReportTypes'
import _ from 'lodash'
import ValidationReportTemplate from './ValidationReportTemplate'
type MenuItemWithLayout = menuProps & { layout: () => JSX.Element }

const TreeNode = ({ node, parent }: { node: ValidationReport; parent: ValidationReport | null }) => {
  return (
    <Box ml={parent ? 4 : 0} mb={2}>
      <Button variant="outlined" color="primary">
        {node.contentType}
      </Button>

      {Array.isArray(node.children) && node.children.length > 0 && (
        <Box ml={4}>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} parent={node} />
          ))}
        </Box>
      )}
    </Box>
  )
}
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
  console.log('filteredChildren', filteredChildren)
  return (
    <Container>
      <Box flexDirection={'column'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
        <ValidationReportTemplate filteredChildren={filteredChildren} version={version} />
      </Box>
    </Container>
  )
}

const RawContentLayout = (validationReportRawContent: RawContent) => (
  <Container>
    <Box flexDirection={'column'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
      <MessageTemplate rawContent={validationReportRawContent} />
    </Box>
  </Container>
)

const ReportTabs = ({ validationReport, validationReportRawContent, ccdaReport }: ReportProps) => {
  const [value, setValue] = useState(0)

  const menuItems: MenuItemWithLayout[] = [
    { heading: 'Validation Report', href: '', layout: () => ValidationReportLayout(validationReport, '') },
    {
      heading: 'Validation Report USCDI V2',
      href: '',
      layout: () => ValidationReportLayout(validationReport, 'USCDIV2'),
    },
  ]

  validationReportRawContent.map((item) => {
    menuItems.push({ heading: item.filename, href: '', layout: () => RawContentLayout(item) })
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  // console.log(JSON.stringify(menuItems))
  return (
    <Box display="flex">
      <Tabs
        textColor="primary"
        indicatorColor="secondary"
        TabIndicatorProps={{
          sx: {
            width: '8px',
          },
        }}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          bgcolor: 'white',
          color: palette.primary,
          borderRight: 1,
          borderColor: 'divider',
          minWidth: '200px',
          maxHeight: '300px',
        }}
      >
        {menuItems.map((item, index) => (
          <Tab
            sx={{ bgcolor: 'white', color: palette.primary, borderRight: 1, borderColor: 'divider', minWidth: '200px' }}
            label={item.heading}
            key={index}
          />
        ))}
      </Tabs>
      <Box ml={2} flexGrow={1}>
        {menuItems.map((item, index) => (
          <Box role="tabpanel" hidden={value !== index} key={index}>
            {value === index && item.layout()}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ReportTabs
