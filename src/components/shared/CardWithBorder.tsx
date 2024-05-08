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
}: CardWithBorderProps) => {
  const [openModal, setOpenModal] = React.useState(false)

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

  const modalContent = (
    <Box>
      <Typography variant="h6" component="h2">
        TODO:
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Convert this to read markdown from https://github.com/onc-healthit/site-content
      </Typography>
    </Box>
  )

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
          <Link href={useModal ? '' : buttonLink ?? '/'}>
            <Button size="small" variant="text" color="secondary" endIcon={buttonIcon} onClick={handleClickModal}>
              {buttonTitle}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Dialog open={openModal} onClose={handleClickCloseModal}>
        <DialogTitle>{cardHeader}</DialogTitle>
        <DialogContent>{modalContent}</DialogContent>
      </Dialog>
    </>
  )
}

export default CardWithBorder
