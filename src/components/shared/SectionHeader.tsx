import palette from '@/styles/palette'
import { Box, Typography } from '@mui/material'
export interface SectionHeaderProps {
  header: string
  subHeader: string
  isHeaderAlternateColor?: boolean
}
const SectionHeader = ({ header, subHeader, isHeaderAlternateColor }: SectionHeaderProps) => {
  return (
    <Box paddingTop={4} paddingBottom={4}>
      <Typography variant="h4" component={'h2'} sx={isHeaderAlternateColor ? { color: palette.white } : {}}>
        <strong>{header}</strong>
      </Typography>
      <Typography variant="body1" color="secondary" sx={{ pt: '7px' }}>
        <strong>{subHeader}</strong>
      </Typography>
    </Box>
  )
}
export default SectionHeader
