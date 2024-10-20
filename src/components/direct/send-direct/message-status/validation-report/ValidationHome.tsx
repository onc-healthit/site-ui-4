'use client'
import React, { useEffect, useState } from 'react'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import { Container, Box, Tabs, Tab, LinearProgress } from '@mui/material'
import { menuProps } from '@/components/shared/SubMenu'
import palette from '@/styles/palette'
import ValidationTable from './ValidationTable'
import ValidationSolutions from './ValidationSelectedPartsTemplate'
import MessageTemplate from './MessageTemplate'
import ValidationSubMenuTemplate from './ValidationSubMenuTemplate'
import _ from 'lodash'
import { fetchCcdaReport, fetchValidationReport, fetchValidationReportRawContent, findMdn } from '../actions'
import ReportTabs from './ReportTabs'
import { RawContent, ValidationReport } from './ValidationReportTypes'

interface ValidationHomeProps {
  messageId: string
  category: string
}

const ValidationHome = ({ messageId, category }: ValidationHomeProps) => {
  const [isFetching, setIsFetching] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [validationReport, setValidationReport] = useState<ValidationReport>({
    partID: '',
    logID: '',
    rawMessage: '',
    contentType: '',
    contentTransferEncoding: '',
    contentDisposition: '',
    status: false,
    children: [],
    details: [],
    svapdetails: [],
  })
  const [validationReportRawContent, setValidationReportRawContent] = useState<RawContent[]>([])
  const [ccdaReport, setCcdaReport] = useState([])

  const handleFindMdn = async (originalMessageId: string) => {
    const response = await findMdn(originalMessageId)
    const data = await response?.response
    //  console.log('mdnreport', data)
    if (response?.response?.error) {
      setErrorMessage(response.response.error || 'An error occurred while fetching data.')
    }
    return data
  }
  const handleFetchValidationReport = async (messageIdForReport: string) => {
    const response = await fetchValidationReport(messageIdForReport)
    const validationReport: ValidationReport = response?.response
    console.log('validation report', validationReport)
    if (validationReport) {
      setValidationReport(validationReport)
    } else {
      setErrorMessage('Failed to fetch validation report.')
    }
  }
  const handleFetchValidationReportRawContent = async (messageIdForReport: string) => {
    const response = await fetchValidationReportRawContent(messageIdForReport)
    const validationReportRawContent = response?.response || []
    console.log('validation report raw content', validationReportRawContent)
    if (validationReportRawContent.length > 0) {
      setValidationReportRawContent(validationReportRawContent)
    } else {
      setErrorMessage('Failed to fetch validation report raw content.')
    }
  }
  const handleFetchCcdaReport = async (messageIdForReport: string) => {
    const ccdaReport = await fetchCcdaReport(messageIdForReport)
    console.log('ccda report', ccdaReport)
    setCcdaReport(ccdaReport)
  }
  useEffect(() => {
    if (!_.isEmpty(messageId)) {
      setIsFetching(true)
      if (category === 'outgoing') {
        console.log(messageId)
        const decodedMessageId = decodeURIComponent(messageId)
        handleFindMdn(decodedMessageId).then((data) => {
          console.log('mdn report', data)
          handleFetchValidationReport(data.messageId)
          handleFetchValidationReportRawContent(data.messageId)
          handleFetchCcdaReport(data.messageId)
        })
      } else {
        handleFetchValidationReport(messageId)
        handleFetchValidationReportRawContent(messageId)
        handleFetchCcdaReport(messageId)
      }
      setIsFetching(false)
    }
  }, [category, messageId])
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/senddirect#message-status" key="2" className={styles.link}>
            Send Direct Message
          </Link>,
          <Link color="inherit" href="/direct/messagestatus/validationreport" key="3" className={styles.link}>
            Validation Report
          </Link>,
        ]}
        heading={'Validation Report'}
        description={`${decodeURIComponent(messageId)}`}
      />
      {/* Main Content */}
      {isFetching ? (
        <LinearProgress />
      ) : (
        <Container>
          <Box pt={4} flexDirection={'row'} gap={4} justifyContent={'space-between'} display={'flex'} pb={2}>
            <ReportTabs
              validationReport={validationReport}
              validationReportRawContent={validationReportRawContent}
              ccdaReport={ccdaReport}
            />
          </Box>
        </Container>
      )}
    </>
  )
}

export default ValidationHome
