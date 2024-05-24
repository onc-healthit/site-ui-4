import { Box } from '@mui/material'
interface OriginalCCDAResultProps {
  xmlData: string
}

const OriginalCCDAResult = ({ xmlData }: OriginalCCDAResultProps) => {
  return (
    <Box>
      <pre>{xmlData}</pre>
    </Box>
  )
}
export default OriginalCCDAResult
