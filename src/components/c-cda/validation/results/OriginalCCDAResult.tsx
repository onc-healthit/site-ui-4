import palette from '@/styles/palette'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
interface OriginalCCDAResultProps {
  xmlData: { ccdaFileContents: string }
}

const OriginalCCDAResult = ({ xmlData }: OriginalCCDAResultProps) => {
  return (
    <Accordion
      sx={{
        py: 0,
        '&:before': {
          display: 'none',
        },
        borderLeft: `4px solid ${palette.greyDark}`,
      }}
      disableGutters
      elevation={1}
    >
      <AccordionSummary sx={{ borderBottom: `1px solid ${palette.divider}` }} expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: 'bold', border: `` }}>C-CDA</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        <Box sx={{ marginBottom: 1, width: '100%', overflow: 'auto' }} p={2}>
          <pre style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>{xmlData.ccdaFileContents}</pre>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
export default OriginalCCDAResult
