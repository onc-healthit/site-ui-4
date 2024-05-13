'use client'
import { Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
interface DragDropFileUploadProps {
  maxFiles?: number
  name?: string
}
export default function DragDropFileUpload({ maxFiles, name }: DragDropFileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
  }
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: maxFiles || 1,
    onDrop: (acceptedFiles) => {
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
        <Button component="label" size="large" variant="text" color="primary" onClick={open}>
          BROWSE
        </Button>
      </div>
      {files.map((file) => {
        return (
          <div key={file.name}>
            {file.name} - {file.size} bytes
          </div>
        )
      })}
    </div>
  )
}
