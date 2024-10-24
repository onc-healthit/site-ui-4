'use client'
import React, { useEffect, useState } from 'react'
import BannerBox from '@/components/shared/BannerBox'
import Link from 'next/link'
import styles from '@shared/styles.module.css'
import { Container, LinearProgress } from '@mui/material'
import _ from 'lodash'
import { fetchCcdaReport, fetchValidationReport, fetchValidationReportRawContent, findMdn } from '../actions'
import ReportTabs from './ReportTabs'
import { RawContent, ValidationReport } from './ValidationReportTypes'
import ErrorDisplayCard from '@/components/c-cda/validation/results/ErrorDisplay'
import PageAlertBox from '@/components/shared/PageAlertBox'
import { useSession } from 'next-auth/react'

interface ValidationHomeProps {
  messageId: string
  category: string
}

const ValidationHome = ({ messageId, category }: ValidationHomeProps) => {
  const { status } = useSession()
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
    //console.log('validation report', validationReport)
    if (validationReport) {
      setValidationReport(validationReport)
    }
    if (_.has(response, 'response.error')) {
      setErrorMessage(response?.response.error || 'Failed to fetch validation report.')
    }
  }
  const handleFetchValidationReportRawContent = async (messageIdForReport: string) => {
    const response = await fetchValidationReportRawContent(messageIdForReport)
    const validationReportRawContent = response?.response || []
    // console.log('validation report raw content', validationReportRawContent)
    if (validationReportRawContent.length > 0) {
      setValidationReportRawContent(validationReportRawContent)
    }
    if (_.has(response, 'response.error')) {
      setErrorMessage(response?.response.error || 'Failed to fetch validation raw content report.')
    }
  }
  const handleFetchCcdaReport = async (messageIdForReport: string) => {
    const response = await fetchCcdaReport(messageIdForReport)
    const ccdaReport = response?.response || []
    // console.log('ccda report', ccdaReport)
    if (ccdaReport.length > 0) {
      setCcdaReport(ccdaReport)
    }
    if (_.has(response, 'response.error')) {
      setErrorMessage(response?.response.error || 'Failed to fetch ccda report.')
    }
  }
  useEffect(() => {
    if (status === 'authenticated') {
      if (!_.isEmpty(messageId)) {
        if (category === 'outgoing') {
          setIsFetching(true)
          // console.log(messageId)
          const decodedMessageId = decodeURIComponent(messageId)
          handleFindMdn(decodedMessageId).then((data) => {
            // console.log('mdn report', data)
            handleFetchValidationReport(data.messageId)
            handleFetchValidationReportRawContent(data.messageId)
            handleFetchCcdaReport(data.messageId)
            setIsFetching(false)
          })
        } else {
          setIsFetching(true)
          handleFetchValidationReport(messageId)
          handleFetchValidationReportRawContent(messageId)
          handleFetchCcdaReport(messageId)
          setIsFetching(false)
        }
      }
    }
  }, [category, messageId, status])
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/senddirect#message-status" key="2" className={styles.link}>
            Message Status
          </Link>,
          <Link color="inherit" href="/direct/messagestatus/validationreport" key="3" className={styles.link}>
            Validation Report
          </Link>,
        ]}
        heading={'Validation Report'}
        description={`${decodeURIComponent(messageId)}`}
      />
      {/* Main Content */}
      {status !== 'authenticated' ? (
        <Container sx={{ pt: 4 }}>
          <PageAlertBox message="You must be logged in to access Message Status." />
        </Container>
      ) : (
        <>
          {isFetching ? (
            <LinearProgress />
          ) : (
            <>
              {_.isEmpty(errorMessage) && (
                <Container>
                  <ReportTabs
                    validationReport={validationReport}
                    validationReportRawContent={validationReportRawContent}
                    ccdaReport={ccdaReport}
                  />
                </Container>
              )}
              {!_.isEmpty(errorMessage) && (
                <ErrorDisplayCard
                  open={true}
                  handleClose={() => setErrorMessage('')}
                  response={{ error: errorMessage }}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default ValidationHome
