import SearchIcon from '@mui/icons-material/Search'
import { TextField, InputAdornment } from '@mui/material'
/* To-Do: This is placeholder component to be able to search for tests, funtionality to be added later */
const TestFilter = () => {
  return (
    <TextField
      fullWidth
      id="search-test"
      name="SearchTest"
      label="Search for Test"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" fontSize={'small'} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default TestFilter
