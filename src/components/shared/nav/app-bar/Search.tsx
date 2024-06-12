import SearchIcon from '@mui/icons-material/Search'
import { InputBase, Box } from '@mui/material'

export default function Search() {
  return (
    <Box display={'flex'} alignItems={'center'} px={2} py={1} m={1} bgcolor={'#FFFFFF15'}>
      <InputBase placeholder="Search…" sx={{ color: 'white' }} inputProps={{ 'aria-label': 'search' }} />
      <SearchIcon sx={{ color: 'palette.primaryDark' }} />
    </Box>
  )
}
