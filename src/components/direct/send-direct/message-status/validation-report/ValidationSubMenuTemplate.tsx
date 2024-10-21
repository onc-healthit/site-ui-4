import React, { useEffect } from 'react'
import { List, Typography, Card, CardContent, Divider, Button, Box } from '@mui/material'
import { CheckCircle, ErrorOutline } from '@mui/icons-material'
import { ValidationReport } from './ValidationReportTypes'
import { Child, FilteredChildrenProps } from './ValidationReportTemplate'
import palette from '@/styles/palette'

interface SubMenuProps {
  filteredChildren: Child[]
  selectNode: (node: ValidationReport) => void
}
const extractContentType = (contentType: string) => {
  const semicolonIndex = contentType.indexOf(';')
  return semicolonIndex !== -1 ? contentType.substring(0, semicolonIndex) : contentType
}
const TreeNode = ({
  node,
  parent,
  onSelectNode,
}: {
  node: ValidationReport
  parent: ValidationReport | null
  onSelectNode: (node: ValidationReport) => void
}) => {
  const contentTypeText = extractContentType(node.contentType)
  return (
    <Box borderLeft={`1.5px solid ${palette.primary}`} ml={parent ? 4 : 0}>
      <List
        sx={{
          marginLeft: '1px',
        }}
      >
        <Button
          sx={{
            px: 2,
            '&:focus': {
              borderRight: `8px solid ${palette.secondaryLight}`, // Add focus outline
            },
            '&:hover': {
              backgroundColor: `${palette.greyLight}`, // Lighten the background on hover
            },
            ml: '8px',
            bgcolor: 'white',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: '-10px',
              width: '10px',
              height: '1px',
              backgroundColor: palette.primary, // Dot color
            },
          }}
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => onSelectNode(node)}
        >
          {node.status ? <CheckCircle sx={{ mr: 1 }} color="success" /> : <ErrorOutline sx={{ mr: 1 }} color="error" />}
          {contentTypeText}
        </Button>

        {Array.isArray(node.children) && node.children.length > 0 && (
          <Box ml={4}>
            {node.children.map((child, index) => (
              <TreeNode key={index} node={child} parent={node} onSelectNode={onSelectNode} />
            ))}
          </Box>
        )}
      </List>
    </Box>
  )
}
const ValidationSubMenuTemplate = ({ filteredChildren, selectNode }: SubMenuProps) => {
  /*   useEffect(() => {
    if (filteredChildren.length > 0) {
      const firstNode = filteredChildren[0].node
      selectNode(firstNode)
    }
  }, [filteredChildren, selectNode]) */
  return (
    <Card sx={{ width: '75%' }}>
      <CardContent>
        <Typography variant="h4" sx={{ pb: 1 }}>
          Summary
        </Typography>
        <Typography variant="caption" sx={{ mb: 2 }}>
          Click on the menu item to view the selected parts & table.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box border={`1px solid ${palette.greyLight}`} borderRadius={2} p={2}>
          {filteredChildren.map(
            ({ node, parent }, index) =>
              parent === null && <TreeNode key={index} node={node} parent={parent} onSelectNode={selectNode} />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ValidationSubMenuTemplate
