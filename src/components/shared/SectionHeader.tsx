import { Box, Typography } from '@mui/material'
export interface SectionHeaderProps {
  header: string
  subHeader: string
}
const SectionHeader = ({ header, subHeader }: SectionHeaderProps) => {
  return (
    <Box paddingTop={4} paddingBottom={4}>
      <Typography variant="h4" component={'h2'}>
        <strong>{header}</strong>
      </Typography>
      <Typography variant="body1" color="secondary">
        <strong>{subHeader}</strong>
      </Typography>
    </Box>
  )
}
export default SectionHeader
