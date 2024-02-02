import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material'

export interface VerticalCardProps {
  title: string
  description: string
  buttonTitle: string
  buttonIcon: React.ReactNode
  buttonHref: string
}
const VerticalCard = ({ title, description, buttonTitle, buttonIcon, buttonHref }: VerticalCardProps) => {
  return (
    <Card>
      <CardHeader
        sx={{ pb: 0 }}
        titleTypographyProps={{ fontSize: '1em', fontWeight: '600' }}
        title={title}
      ></CardHeader>
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <Button
        disableRipple
        href={buttonHref}
        sx={{ ml: 1, mb: 1 }}
        size="small"
        variant="text"
        color="secondary"
        endIcon={buttonIcon}
      >
        {buttonTitle}
      </Button>
    </Card>
  )
}

export default VerticalCard
