import { JSX } from '@emotion/react/jsx-runtime'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

/* Custom Imports */
import palette from '@/styles/palette'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Divider } from '@mui/material'

interface NavListHeadItemProps {
  text: string
  handleClickCategoryList: () => void
  icon: JSX.Element
  openCategoryList: boolean
}
export default function NavListHeadItem({
  text,
  handleClickCategoryList,
  icon,
  openCategoryList,
}: NavListHeadItemProps) {
  return (
    <>
      <ListItemButton onClick={handleClickCategoryList}>
        <ListItemIcon sx={{ color: `${palette.primary}`, strokeWidth: 0.5, stroke: `${palette.primary}` }}>
          {icon}
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ color: palette.primary, fontWeight: 500 }} primary={text} />
        {openCategoryList ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </ListItemButton>
      {/* As the Nav drawer is closed, remove the divider below the header
      so we don't have double dividers (which looks too thick) */}
      {openCategoryList && <Divider sx={{ borderWidth: 1.4 }} />}
    </>
  )
}
