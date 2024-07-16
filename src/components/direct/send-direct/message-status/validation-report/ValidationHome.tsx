'use client'
import React, { useState } from 'react'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import { Container, Box, Tabs, Tab } from '@mui/material'
import { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import ValidationTable from './ValidationTable'
import ValidationSolutions from './ValidationSelectedPartsTemplate'
import MessageTemplate from './MessageTemplate'
import ValidationSubMenuTemplate from './ValidationSubMenuTemplate'

type MenuItemWithLayout = menuProps & { layout: () => JSX.Element }

const VerticalTabs = ({ menuItems }: { menuItems: MenuItemWithLayout[] }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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

const Layout1 = () => (
  <Container>
    <Box flexDirection={'column'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
      <Box flexDirection={'row'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
        <ValidationSubMenuTemplate />
        <ValidationSolutions />
      </Box>
      <ValidationTable />
    </Box>
  </Container>
)

const Layout2 = () => (
  <Container>
    <Box flexDirection={'column'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
      <MessageTemplate />
    </Box>
  </Container>
)

const ValidationHome = () => {
  const menuItems: MenuItemWithLayout[] = [
    { heading: 'Validation Report', href: '', layout: Layout1 },
    { heading: 'Validation Report USCDI V2', href: '', layout: Layout1 },
    { heading: 'Encrypted Message', href: '', layout: Layout2 },
    { heading: 'Decrypted Message', href: '', layout: Layout2 },
    { heading: 'Attachment-0', href: '', layout: Layout2 },
    { heading: 'Attachment-1', href: '', layout: Layout2 },
  ]

  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/senddirect" key="2" className={styles.link}>
            Send Direct Message
          </Link>,
          <Link color="inherit" href="/direct/senddirect/messagestatusreport" key="3" className={styles.link}>
            Validation Report
          </Link>,
        ]}
        heading={'Validation Report'}
        description={<>Validation Report Number</>}
      />
      {/* Main Content */}
      <Container>
        <Box pt={4} flexDirection={'row'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
          <VerticalTabs menuItems={menuItems} />
        </Box>
      </Container>
    </>
  )
}

export default ValidationHome
