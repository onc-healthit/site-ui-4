import { Card, CardHeader, CardContent, Button } from '@mui/material'

export interface VerticalCardProps {
  title: string
  description: React.ReactNode
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
      <CardContent sx={{ pb: 1 }}>{description}</CardContent>
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
