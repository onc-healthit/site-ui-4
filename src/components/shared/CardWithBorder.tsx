'use client'
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as React from 'react'

export interface CardWithBorderProps {
  cardHeader: string
  description?: string
  buttonTitle: string
  buttonLink?: string // include a link or a modal
  buttonIcon: React.ReactNode
  useModal?: boolean // include a modal or a link
  modalContent?: string // sanitized HTML
  cardWidthPercent?: number | undefined // change the width of the card to any % vs default
}
const genericCardBlueBorder = {
  display: 'flex',
  width: '50%', // default width
  borderTop: '16px solid #122953',
}

const flexibleContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 2,
  p: 2,
}
const CardWithBorder = ({
  cardHeader,
  description,
  buttonIcon,
  buttonLink,
  buttonTitle,
  useModal,
  cardWidthPercent,
  modalContent,
}: CardWithBorderProps) => {
  const [openModal, setOpenModal] = React.useState(false)

  const isExternalLink: boolean = buttonLink ? buttonLink.startsWith('http') : false

  const handleClickModal = () => {
    if (useModal) {
      setOpenModal(true)
    }
  }

  const handleClickCloseModal = () => {
    if (useModal) {
      setOpenModal(false)
    }
  }

  const dynamicCardStyle = React.useMemo(() => {
    return {
      ...genericCardBlueBorder,
      width: cardWidthPercent ? `${cardWidthPercent}%` : genericCardBlueBorder.width,
    }
  }, [cardWidthPercent])

  return (
    <>
      <Card sx={{ ...dynamicCardStyle }}>
        <CardContent sx={{ ...flexibleContent }}>
          <Typography variant="h6" component="h3" color="default">
            <strong>{cardHeader}</strong>
          </Typography>
          {description && (
            <Typography variant="body2" color="default">
              {description}
            </Typography>
          )}
          <Link
            href={useModal ? '' : buttonLink ?? '/'}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
          >
            <Button size="small" variant="text" color="secondary" endIcon={buttonIcon} onClick={handleClickModal}>
              {buttonTitle}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Dialog open={openModal} onClose={handleClickCloseModal} fullWidth={true} maxWidth="lg">
        <DialogTitle>
          <strong>{cardHeader}</strong>
        </DialogTitle>
        <DialogContent>
          <Box>{modalContent && <div dangerouslySetInnerHTML={{ __html: modalContent }} />}</Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CardWithBorder
