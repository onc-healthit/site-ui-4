import DragDropFileUpload from '@/components/shared/DragandDropFile'
import { Box, Button, Container, Typography } from '@mui/material'

// TODO: Create a generic version of this to Support unique functionality
// (API calls) of different C-CDA validators without duplication
export default function V3IGOnlyTab() {
  return (
    <Container>
      {/* Header */}
      <Box>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', pt: 4 }}>
          To validate with the C-CDA Implementation Guide, attach or drag your C-CDA document and press Validate:
        </Typography>
        <Typography variant="h6" component="h3" sx={{ pt: 3 }}>
          *Note: This validation alone is not used for certification
        </Typography>
      </Box>

      {/* Upload */}
      <Box sx={{ pt: 3 }}>
        <DragDropFileUpload />
      </Box>

      {/* Validate */}
      <Box sx={{ pt: 4 }}>
        <Button variant="contained">VALIDATE</Button>
      </Box>
    </Container>
  )
}
