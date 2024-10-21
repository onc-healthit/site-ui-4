import React, { useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Box,
} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
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
    <Box ml={parent ? 4 : 0}>
      <List sx={{ borderLeft: `1.5px solid ${palette.primary}`, borderLeftStyle: 'dotted' }}>
        <Button
          sx={{
            borderRadius: '0 0.3rem 0.3rem 0', // top-left, top-right, bottom-right, bottom-left
            borderTop: `.5px solid ${palette.primary}`,
            borderBottom: `.5px solid ${palette.primary}`,
            borderRight: `.5px solid ${palette.primary}`,
          }}
          variant="text"
          color="primary"
          onClick={() => onSelectNode(node)}
        ></Button>

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
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ pb: 1 }}>
          Summary
        </Typography>
        <Typography variant="caption" sx={{ mb: 2 }}>
          Click on the menu item to view the selected parts & table.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {filteredChildren.map(
          ({ node, parent }, index) =>
            parent === null && <TreeNode key={index} node={node} parent={parent} onSelectNode={selectNode} />
        )}
        {/* <List sx={{ p: 0, width: '450px' }} component="nav" aria-label="Tree menu">
          {items.map((item, index) => (
            <ListItem
              key={index}
              sx={{ pl: item.paddingLeft, display: 'flex', gap: 1, justifyContent: 'space-between' }}
            >
              <ListItemButton sx={{ pl: 0, py: 0.1 }}>
                <Typography sx={{ whiteSpace: 'break-spaces', fontSize: '.9em', py: 0.5, px: 1 }}>
                  {item.text}
                </Typography>
              </ListItemButton>
              <ListItemIcon sx={{ minWidth: '0px' }}>
                <CheckCircle color="success" />
              </ListItemIcon>
            </ListItem>
          ))}
        </List> */}
      </CardContent>
    </Card>
  )
}

export default ValidationSubMenuTemplate
