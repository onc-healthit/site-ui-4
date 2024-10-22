import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Card,
  CardContent,
  Container,
} from '@mui/material'
import React, { useState, useContext } from 'react'
import Profile from '../shared/Profile'
import palette from '@/styles/palette'
import TestCard from '../hisp/TestCard'
import XDRTestCard from '../hisp/XDRTestCard'
import testCases from '../../../assets/SMTPTestCases'
import xdrTestCases from '../../../assets/XDRTestCases'
import { ProfileContext } from '../hisp/context'
import DownloadXDRCert from '../shared/DownloadXDRCert'
import eventTrack from '@/services/analytics'

interface TestCase {
  id: number
  name: string
  criteria?: string | string[]
  protocol: string
  description?: string
}

interface XDRTestCase {
  id: number
  name: string
  criteria?: string | string[]
}

interface Subcategory {
  value: string
  label: string
  categories: string[]
  link?: string
  testCard?: boolean
  criteria?: string[]
  testSources?: string[]
  receive?: boolean
}

const H2Component = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')
  const { hostname, email, password, tls, username } = useContext(ProfileContext)
  const [isXDR, setIsXDR] = React.useState(false)

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'setup', label: 'Setup' },
    { value: 'send', label: 'Send' },
    { value: 'sendDeliveryNotification', label: 'Send - Delivery Notification for Direct' },
    { value: 'sendDirectXDM', label: 'Send using Direct+XDM' },
    { value: 'sendConversionXDR', label: 'Send conversion XDR' },
    { value: 'sendEdgeProtocol', label: 'Send using Edge Protocol' },
    { value: 'receive', label: 'Receive' },
    { value: 'receiveDeliveryNotification', label: 'Receive - Delivery Notification in Direct' },
    { value: 'receiveDirectXDM', label: 'Receive using Direct+XDM' },
    { value: 'receiveConversionXDR', label: 'Receive conversion XDR' },
    { value: 'receiveEdgeProtocol', label: 'Receive using Edge Protocol' },
  ]

  function parseCriteria(criteria: string | string[] | undefined): string[] {
    if (!criteria) return []
    if (Array.isArray(criteria)) return criteria
    if (typeof criteria === 'string') {
      if (criteria.startsWith('[') && criteria.endsWith(']')) {
        try {
          const jsonCriteria = criteria.replace(/'/g, '"')
          const parsed = JSON.parse(jsonCriteria)
          if (Array.isArray(parsed)) {
            return parsed
          }
        } catch (e) {
          console.error('Failed to parse criteria:', criteria, e)
          return []
        }
      }
      return [criteria]
    }
    return []
  }

  const subcategories: Subcategory[] = [
    {
      value: 'certificateDiscoveryHosting',
      label: 'Paragraph (i) Certificate Discovery / Hosting - 2015 DCDT',
      categories: [
        'all',
        'setup',
        'send',
        'sendDeliveryNotification',
        'sendDirectXDM',
        'receive',
        'receiveDeliveryNotification',
        'receiveDirectXDM',
      ],
      link: '/direct/dcdt#hosting',
    },
    {
      value: 'registerDirect',
      label: 'Paragraph (i) Register Direct',
      categories: ['all', 'setup', 'send', 'sendDeliveryNotification', 'sendDirectXDM'],
      link: '/direct/register',
    },
    {
      value: 'directHomeCertificates',
      label: 'Paragraph (i) Direct Home - Certificates',
      categories: ['all', 'setup', 'send', 'receive', 'receiveDirectXDM'],
      link: '/direct#certification-download',
    },
    {
      value: 'sendDirectMessage',
      label: 'Paragraph (i) Send Direct Message',
      categories: ['all', 'setup', 'send', 'receive', 'receiveDirectXDM'],
      link: '/direct/senddirect',
    },
    {
      value: 'messageStatus',
      label: 'Paragraph (i) Message Status',
      categories: ['all', 'setup', 'send', 'receive', 'receiveDirectXDM'],
      link: '/direct/senddirect#message-status',
    },
    {
      value: 'ccdaValidator',
      label: 'Paragraph (i) C-CDA R2.1 validator',
      categories: ['all', 'send'],
      link: '/c-cda/uscdi-v3',
    },
    {
      value: 'xdmValidator',
      label: 'Paragraph (i) XDM Validator',
      categories: ['all', 'send', 'sendDirectXDM', 'sendEdgeProtocol', 'receive', 'receiveDirectXDM'],
      link: '/direct/xdm',
    },
    {
      value: 'sendConversionXDR',
      label: 'Paragraph (i)(B) Send conversion XDR',
      categories: ['all', 'sendConversionXDR', 'send'],
      testCard: true,
      testSources: ['xdr'],
      criteria: ['h2-1'],
    },
    {
      value: 'receiveConversionXDR',
      label: 'Paragraph (i)(B) Receive conversion XDR',
      categories: ['all', 'receiveConversionXDR', 'receive'],
      testCard: true,
      testSources: ['xdr'],
      criteria: ['h2-2'],
      receive: true,
    },
    {
      value: 'sendEdgeXDR',
      categories: ['all', 'sendEdgeProtocol', 'send', 'sendConversionXDR'],
      label: 'Paragraph (i)(C) Send using Edge Protocol - XDR',
      testCard: true,
      testSources: ['xdr'],
      criteria: ['h2-3'],
    },
    {
      value: 'sendEdgeSMTP',
      categories: ['all', 'sendEdgeProtocol', 'send'],
      label: 'Paragraph (i)(C) Send using Edge Protocol - SMTP',
      testCard: true,
      testSources: ['smtp'],
      criteria: [''],
    },
    {
      value: 'sendEdgeDeliveryNotification',
      label: 'Paragraph (i)(C) Send using Edge Protocol - Delivery Notification',
      categories: ['all', 'sendEdgeProtocol', 'send'],
      testCard: true,
      testSources: ['smtp'],
      criteria: ['b1-8', 'sc2-4'],
    },
    {
      value: 'sendEdgeIMAP',
      label: 'Paragraph (i)(C) Send using Edge Protocol - IMAP',
      categories: ['all', 'sendEdgeProtocol', 'send'],
      testCard: true,
      testSources: ['smtp'],
      criteria: ['h2-5'],
    },
    {
      value: 'sendEdgePOP',
      label: 'Paragraph (i)(C) Send using Edge Protocol - POP',
      categories: ['all', 'sendEdgeProtocol', 'send'],
      testCard: true,
      testSources: ['smtp'],
      criteria: ['h2-6'],
    },
    {
      value: 'receiveEdgeXDR',
      label: 'Paragraph (i)(C) Receive using Edge Protocol - XDR',
      categories: ['all', 'receiveEdgeProtocol', 'receive'],
      testCard: true,
      testSources: ['xdr'],
      criteria: ['h2-7'],
      receive: true,
    },
    {
      value: 'receiveEdgeSMTP',
      label: 'Paragraph (i)(C) Receive using Edge Protocol - SMTP',
      categories: ['all', 'receiveEdgeProtocol', 'receive'],
      testCard: true,
      testSources: ['smtp'],
      criteria: ['h2-8'],
      receive: true,
    },
    {
      value: 'deliveryNotificationSMTP',
      label: 'Paragraph (ii) Delivery Notification in Direct - SMTP',
      categories: ['all', 'sendDeliveryNotification', 'send'],
      testCard: true,
      testSources: ['smtp'],
      criteria: ['h2-9'],
    },
    {
      value: 'receiveSMTPDispositionNotification',
      label: 'Paragraph (ii) Receive SMTP: Disposition-Notification',
      categories: ['all', 'receiveDeliveryNotification', 'receive'],
      testCard: true,
      testSources: ['smtp'],
      criteria: ['h2-10'],
      receive: true,
    },
    {
      value: 'deliveryNotificationXDR',
      label: 'Paragraph (ii)(C) Delivery Notification in Direct - XDR',
      categories: ['all', 'sendDeliveryNotification', 'send'],
      testCard: true,
      testSources: ['xdr'],
      criteria: ['h2-11'],
    },
    {
      value: 'receiveXDRDispositionNotification',
      label: 'Paragraph (ii)(C) Receive XDR: Disposition-Notification',
      categories: ['all', 'receiveDeliveryNotification', 'receive'],
      testCard: true,
      testSources: ['xdr'],
      criteria: ['h2-12'],
      receive: true,
    },
  ]

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value)
    setSelectedSubcategory('')

    if (event.target.value.includes('XDR')) {
      setIsXDR(true)
    } else {
      setIsXDR(false)
    }
    eventTrack(`Selected: ${event.target.value}`, 'Test By Criteria - H2', 'User selects category on h2 tab')
  }

  const handleSubcategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    const selectedOption = subcategories.find((option) => option.value === value)
    setSelectedSubcategory(value)

    if (selectedOption) {
      if (selectedOption.testCard) {
      } else if (selectedOption.link) {
        window.location.href = selectedOption.link
        eventTrack(
          `Selected sub category: ${selectedOption.link}`,
          'Test By Criteria - H2',
          'User selects sub category on h2 tab'
        )
      }
    }
    if (event.target.value.includes('XDR')) {
      setIsXDR(true)
    } else {
      setIsXDR(false)
    }
    eventTrack(
      `Selected: sub category ${event.target.value}`,
      'Test By Criteria - H2',
      'User selects sub category on h2 tab'
    )
  }

  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      selectedCategory === 'all' || !selectedCategory || subcategory.categories.includes(selectedCategory)
  )

  const selectedOption = subcategories.find((option) => option.value === selectedSubcategory)

  const showTestCard = selectedOption?.testCard

  const selectedTestCases: TestCase[] =
    showTestCard && selectedOption?.testSources?.includes('smtp')
      ? (testCases.tests as TestCase[]).filter((test: TestCase) => {
          const testCriteriaArray = parseCriteria(test.criteria)
          return selectedOption?.criteria?.some((criterion) => testCriteriaArray.includes(criterion))
        })
      : []

  const selectedXDRTestCases: XDRTestCase[] =
    showTestCard && selectedOption?.testSources?.includes('xdr')
      ? (xdrTestCases as XDRTestCase[]).filter((test: XDRTestCase) => {
          const testCriteriaArray = parseCriteria(test.criteria)
          return selectedOption?.criteria?.some((criterion) => testCriteriaArray.includes(criterion))
        })
      : []

  return (
    <Container>
      <Box sx={{ display: 'flex', width: '100%', pt: 4, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: '40%' }}>
          <Card>
            <CardContent>
              <Box component="form" sx={{ backgroundColor: palette.white }}>
                <Typography variant="body2" gutterBottom>
                  Use the menu to select what paragraph you want to test for..
                </Typography>
                <Box>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="category-select-label">Choose a category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={selectedCategory}
                      label="Choose a category"
                      onChange={handleCategoryChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="subcategory-select-label">Choose a sub-category</InputLabel>
                    <Select
                      labelId="subcategory-select-label"
                      id="subcategory-select"
                      value={selectedSubcategory}
                      label="Choose a sub-category"
                      onChange={handleSubcategoryChange}
                      disabled={filteredSubcategories.length === 0}
                    >
                      <MenuItem value="">
                        <em>Please select</em>
                      </MenuItem>
                      {filteredSubcategories.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>
          {isXDR && <DownloadXDRCert />}
          {!isXDR && (
            <Card>
              <Profile />
            </Card>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {showTestCard &&
            selectedTestCases.map((test: TestCase, i: number) => (
              <Box key={i} sx={{ mb: 2 }}>
                <TestCard
                  test={{
                    ...test,
                    criteria: Array.isArray(test.criteria) ? test.criteria.join(', ') : test.criteria,
                  }}
                  hostname={hostname}
                  email={email}
                  username={username}
                  password={password}
                  tlsRequired={tls}
                  receive={selectedOption?.receive || false}
                />
              </Box>
            ))}
          {showTestCard &&
            selectedXDRTestCases.map((test: XDRTestCase, i: number) => (
              <Box key={i} sx={{ mb: 2 }}>
                <XDRTestCard
                  test={{
                    ...test,
                    criteria: Array.isArray(test.criteria) ? test.criteria.join(', ') : test.criteria,
                  }}
                  receive={selectedOption?.receive || false}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Container>
  )
}

export default H2Component
