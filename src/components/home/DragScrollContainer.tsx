'use client'
import { Box } from '@mui/material'
import React, { useRef, useState } from 'react'

interface DragScrollContainerProps {
  children: React.ReactNode
}
export default function DragScrollContainer(props: DragScrollContainerProps) {
  const rowPaddingBottom: number = 20

  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const draggableContainerStyles = {
    display: '-webkit-box',
    flexDirection: 'row',
    width: '100%',
    overflowX: 'scroll',
    gap: '48px',
    cursor: 'grab', // Set the cursor to grab
    '&:active': {
      cursor: 'grabbing', // Change cursor to grabbing when clicked
    },
    paddingBottom: `${rowPaddingBottom}px`,
  }

  const startDragging = (e: React.MouseEvent<HTMLElement>) => {
    setIsDragging(true)
    const scrollContainer = containerRef.current as unknown as HTMLElement
    setStartX(e.pageX - scrollContainer.offsetLeft)
    setScrollLeft(scrollContainer.scrollLeft)
  }

  const stopDragging = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDragging) return
    e.preventDefault()
    const scrollContainer = containerRef.current as unknown as HTMLElement
    const x = e.pageX - scrollContainer.offsetLeft
    const walk = x - startX
    scrollContainer.scrollLeft = scrollLeft - walk
  }

  return (
    <Box
      ref={containerRef}
      sx={draggableContainerStyles}
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={handleMouseMove}
    >
      {props.children}
    </Box>
  )
}
