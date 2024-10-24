'use client'

import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import * as React from 'react'
import { useTheme } from '@mui/material'

export interface CardWithBorderProps {
  cardHeader: string
  subHeader?: string // fixed type definition for subHeader
  description?: string
  buttonTitle: string
  buttonLink?: string // include a link or a modal
  buttonIcon: React.ReactNode
  useModal?: boolean // include a modal or a link
  modalContent?: string // sanitized HTML
  cardWidthPercent?: number | undefined // change the width of the card to any % vs default
}

const CardWithBorder = ({
  cardHeader,
  subHeader, // added subHeader prop
  description,
  buttonIcon,
  buttonLink,
  buttonTitle,
  useModal,
  cardWidthPercent,
  modalContent,
}: CardWithBorderProps) => {
  const [openModal, setOpenModal] = React.useState(false)
  const theme = useTheme()
  const isExternalLink: boolean = buttonLink ? buttonLink.startsWith('http') : false

  const genericCardBlueBorder = {
    display: 'flex',
    borderTop: '16px solid #122953',
    width: '50%', // default width
    [theme.breakpoints.down('md')]: {
      width: '100%', // default width
    },
  }
  const flexibleContent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
    p: 2,
  }
  const handleClickModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (useModal) {
      event.preventDefault() // prevent link navigation
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
            {subHeader && <Typography variant="body2">{subHeader}</Typography>}
          </Typography>
          {description && (
            <Typography variant="body2" color="default">
              {description}
            </Typography>
          )}
          {useModal ? (
            <Button size="small" variant="text" color="secondary" endIcon={buttonIcon} onClick={handleClickModal}>
              {buttonTitle}
            </Button>
          ) : (
            <Link
              href={buttonLink ?? '/'}
              target={isExternalLink ? '_blank' : undefined}
              rel={isExternalLink ? 'noopener noreferrer' : undefined}
            >
              <Button size="small" variant="text" color="secondary" endIcon={buttonIcon}>
                {buttonTitle}
              </Button>
            </Link>
          )}
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
