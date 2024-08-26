'use client'
import { Button, Typography, Chip, Box } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import palette from '@/styles/palette'
import Close from '@mui/icons-material/Close'
import _ from 'lodash'
{
  /* TO-DO: Handle upload file as per functionality */
}
const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  // flexDirection: 'row', {/* commenting this for now because of typescript warning /*}
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: palette.primary,
  borderStyle: 'dashed',
  backgroundColor: '#F5F5F5',
  color: palette.primary,
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: palette.secondary,
  backgroundColor: palette.greyLight,
}

const rejectStyle = {
  borderColor: palette.error,
}

interface DragDropFileUploadProps {
  maxFiles?: number
  name?: string
  allowedSize?: number
  fileName?: ([]) => void
}

function bytesToSize(bytes: number): string {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

export default function DragDropFileUpload({ maxFiles, allowedSize, name, fileName }: DragDropFileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const maxSize = allowedSize ? allowedSize : 1048576
  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
  }
  const UploadFile = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'Click Upload File', {
        event_category: 'Button',
        event_label: 'Drag & Drop File Upload',
      })
    }
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open, fileRejections } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: maxFiles || 1,
    minSize: 0,
    maxSize: maxSize,
    onDrop: (acceptedFiles) => {
      fileName?.(acceptedFiles)
      setFiles(acceptedFiles)
      if (hiddenInputRef.current) {
        const dataTransfer = new DataTransfer()
        acceptedFiles.map((file) => {
          dataTransfer.items.add(file)
        })
        hiddenInputRef.current.files = dataTransfer.files
      }
    },
  })

  const fileRejectionErrors = fileRejections.map(({ file, errors }) => (
    <div key={file.name}>
      {errors.map((e) => {
        return (
          <>
            {_.isEqual(e.code, 'file-too-large') && (
              <Typography color={palette.error} key={e.code}>
                {file.name} can not be larger than {bytesToSize(maxSize)}.
              </Typography>
            )}
          </>
        )
      })}
    </div>
  ))

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )
  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input type="file" name={name} hidden style={{ opacity: 0 }} ref={hiddenInputRef} />
        <input {...getInputProps()} />
        <FileUploadIcon />
        <Typography>Drag & Drop file here or </Typography>
        <Button
          component="label"
          size="large"
          variant="text"
          color="primary"
          onClickCapture={UploadFile}
          onClick={open}
        >
          BROWSE
        </Button>
      </div>
      {files.map((file) => {
        return (
          <div key={file.name}>
            <Chip
              sx={{ mt: '32px', p: '16px' }}
              variant="outlined"
              color="primary"
              //deleteIcon={<Close color="error" fontSize="small" />}
              //onDelete={() => removeFile(file.name)} // Remove the file when the delete icon is clicked
              label={`${file.name} - ${file.size} bytes`}
            />
          </div>
        )
      })}
      <Box py={'16px'}>{fileRejectionErrors}</Box>
    </div>
  )
}
