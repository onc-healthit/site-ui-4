import palette from '@/styles/palette'
import { Box, Typography } from '@mui/material'
export interface SectionHeaderProps {
  header: string
  subHeader: string
  isHeaderAlternateColor?: boolean
  isSubHeaderAlternateColor?: string
}
const SectionHeader = ({
  header,
  subHeader,
  isHeaderAlternateColor,
  isSubHeaderAlternateColor,
}: SectionHeaderProps) => {
  return (
    <Box paddingTop={4} paddingBottom={4}>
      <Typography
        fontWeight={'bold'}
        variant="h4"
        component={'h2'}
        bgcolor="transparent"
        sx={isHeaderAlternateColor ? { color: palette.white } : {}}
      >
        {header}
      </Typography>
      <Typography
        fontWeight={'bold'}
        variant="body1"
        sx={{
          color: isSubHeaderAlternateColor || palette.secondary, // Use subHeaderColor if provided, otherwise default
          pt: '7px',
          backgroundColor: 'transparent',
        }}
      >
        {subHeader}
      </Typography>
    </Box>
  )
}
export default SectionHeader
