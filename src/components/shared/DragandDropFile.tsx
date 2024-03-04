'use client'
import { Button, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import palette from '@/styles/palette'

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

export default function DragDropFileUpload() {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop: (files) => console.log(files),
  })

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
        <input {...getInputProps()} />
        <FileUploadIcon />
        <Typography>Drag & Drop file here or </Typography>
        <Button component="label" size="large" variant="text" color="primary" onClick={open}>
          BROWSE
        </Button>
      </div>
    </div>
  )
}
