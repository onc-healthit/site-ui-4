import { CloudOutlined } from '@mui/icons-material'
import { Divider, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material/'
import Link from 'next/link'

/* Custom Imports */
import { NAV_PADDING_LEFT_SINGLE_HEADER, NAV_THICKER_DIVIDER } from '@/constants/navConstants'
import palette from '@/styles/palette'

export default function SiteNavIndustryResources() {
  return (
    <div id="site-nav-industry-testing">
      <Link href="/industry-resources" passHref>
        <Tooltip arrow placement="right" title="Industry Resources">
          <ListItemButton>
            <ListItemIcon>
              <CloudOutlined
                aria-label="Go to Industry Resources"
                sx={{ strokeWidth: 0.5, stroke: `${palette.primary}` }}
                color="primary"
              />
              <ListItemText
                primaryTypographyProps={{ color: palette.primary, fontWeight: 500 }}
                primary="Industry Resources"
                sx={{ pl: NAV_PADDING_LEFT_SINGLE_HEADER, color: 'inherit' }}
              />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </Link>
      <Divider sx={{ borderWidth: NAV_THICKER_DIVIDER }} />
    </div>
  )
}
