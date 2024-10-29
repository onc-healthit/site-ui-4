import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

/* Custom Imports */
import { NAV_PADDING_LEFT } from '@/constants/navConstants'
import palette from '@/styles/palette'
import { NavListItemType } from '@/types/NavListItemType'
import { Tooltip } from '@mui/material'

interface NavListSubItemProps {
  item: NavListItemType
}
export default function NavListSubItem({ item }: NavListSubItemProps) {
  return (
    <List component="div" disablePadding>
      <Link
        href={item.href}
        target={item.isExternalLink ? '_blank' : undefined}
        rel={item.isExternalLink ? 'noopener noreferrer' : undefined}
      >
        <Tooltip title={item.text} arrow placement="right">
          <ListItemButton sx={{ pl: NAV_PADDING_LEFT }}>
            <ListItemIcon sx={{ color: `${palette.primary}` }}>{item.icon}</ListItemIcon>
            <ListItemText primaryTypographyProps={{ color: palette.primary }} primary={item.text} />
          </ListItemButton>
        </Tooltip>
      </Link>
    </List>
  )
}
