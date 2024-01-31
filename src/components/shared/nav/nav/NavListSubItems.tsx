import { Collapse, Divider } from '@mui/material'

/* Custom Imports */
import { NAV_THICKER_DIVIDER } from '@/constants/navConstants'
import { NavListItemType } from '@/types/NavListItemType'
import NavListSubItem from './NavListSubItem'

interface NavListSubItems {
  items: NavListItemType[]
  openCategoryList: boolean
}
export default function NavListSubItems({ items, openCategoryList }: NavListSubItems) {
  return (
    <>
      <Collapse in={openCategoryList} timeout="auto" unmountOnExit>
        {items.map((item) => {
          return <NavListSubItem key={item.text} item={item} />
        })}
      </Collapse>
      <Divider sx={{ borderWidth: NAV_THICKER_DIVIDER }} />
    </>
  )
}
