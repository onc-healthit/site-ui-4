'use client'
import DragDropFileUpload from '@/components/shared/DragandDropFile'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import ValidationComponent from './results/ValidationResultsComponent'

interface IGValidatorFormProps {
  version: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formAction: (prevState: object | undefined, formData: FormData) => Promise<{ response: any } | undefined>
}

export default function IGValidatorForm({ version, formAction }: IGValidatorFormProps) {
  const [data, submitAction] = useFormState(formAction, { response: {} })
  const [fileName, setFileName] = useState('')
  const getFileName = (data: File[]) => {
    //console.log(data[0]?.name)
    if (data !== undefined) {
      setFileName(data[0]?.name)
    }
  }
  return (
    <Container sx={{ pb: 4 }}>
      {/* Header */}
      <form action={submitAction}>
        <Box>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', pt: 4 }}>
            To validate with the C-CDA Implementation Guide, attach or drag your C-CDA document and press Validate:
          </Typography>
          <Typography variant="h6" component="h3" sx={{ pt: 3 }}>
            *Note: This validation alone is not used for certification
          </Typography>
          <input type="hidden" name="version" value={version} />
        </Box>

        {/* Upload */}
        <Box sx={{ pt: 3 }}>
          <DragDropFileUpload maxFiles={1} name="ccdaFile" fileName={getFileName} allowedSize={1048576} />
        </Box>

        {/* Validate */}
        <Box sx={{ pt: 4 }}>
          <ValidationComponent
            response={data?.response}
            estimatedValidationTime={5}
            fileName={fileName}
            criteria="C-CDA_IG_Only"
          />
        </Box>
      </form>
    </Container>
  )
}
