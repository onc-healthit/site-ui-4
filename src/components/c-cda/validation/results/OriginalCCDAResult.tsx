import palette from '@/styles/palette'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import xmlFormatter from 'xml-formatter'
interface OriginalCCDAResultProps {
  xmlData: { ccdaFileContents: string }
}

const OriginalCCDAResult = ({ xmlData }: OriginalCCDAResultProps) => {
  return (
    <Accordion
      slotProps={{
        transition: {
          timeout: 50, // Adjust the expand/collapse animation speed (set to 0 to disable)
        },
      }}
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
        <Typography sx={{ fontWeight: 'bold', border: `` }}>C-CDA Data</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2 }}>
        <Box sx={{ marginBottom: 1, width: '100%', overflow: 'auto' }} p={2}>
          <SyntaxHighlighter language="xml" style={prism} wrapLongLines={true}>
            {xmlFormatter(xmlData.ccdaFileContents, {
              indentation: '  ',
              collapseContent: true,
              lineSeparator: '\n',
            })}
          </SyntaxHighlighter>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
export default OriginalCCDAResult
