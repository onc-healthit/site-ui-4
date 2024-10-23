'use client'
import BannerBox from '@/components/shared/BannerBox'
import styles from '@/components/shared/styles.module.css'
import { Box, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import DragandDropFile from '@components/shared/DragandDropFile'
import { handleXDMUpload } from './actions'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import XDMResults from './XDMResults'
import eventTrack from '@/services/analytics'

const XDM = () => {
  const [base64, setBase64] = useState<string | null>(null)
  const [data, handleSubmit] = useFormState(handleXDMUpload, { response: {} })
  const [fileContent, setFileContent] = useState<File | null>(null)

  const formData = new FormData()
  formData.append('zip', base64 || '')
  const handleSubmitwithBase64 = handleSubmit.bind(null, formData)

  useEffect(() => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      const base64String = result.split(',')[1] // Extract base64 part
      setBase64(base64String)
    }
    if (fileContent) {
      reader.readAsDataURL(fileContent)
    }
  }, [fileContent])

  const getFileName = (data: File[]) => {
    if (data !== undefined) {
      setFileContent(data[0])
    }
  }
  const handleValidation = () => {
    eventTrack('Run XDM Validator', 'XDM Validator', `User submitted file for XDM Validator`)
  }
  return (
    <>
      {/* Global Header */}
      <BannerBox
        breadcrumbs={[
          <Link color="inherit" href="/direct" key="1" className={styles.link}>
            Direct
          </Link>,
          <Link color="inherit" href="/direct/xdm" key="2" className={styles.link}>
            XDM Validator
          </Link>,
        ]}
        heading={'XDM Validator'}
        description={<>Upload your XDM file to validate.</>}
      />

      {/* Main Content */}
      <Container>
        <form action={handleSubmitwithBase64}>
          <Box py={4}>
            <Stack direction="row" alignItems="flex-start" gap={1}>
              <Typography pb={2} variant="body1">
                <strong> Upload your XDM file:</strong>
              </Typography>
            </Stack>
            <DragandDropFile maxFiles={1} name="messageFilePath" allowedSize={5242880} fileName={getFileName} />
          </Box>
          <XDMResults onClick={handleValidation} response={data?.response} buttonTitle={'VALIDATE'} />
        </form>
      </Container>
    </>
  )
}

export default XDM
