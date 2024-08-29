import { Box, Typography } from '@mui/material'

import ResultsComponent from './ResultsComponent'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import _ from 'lodash'
interface ResultsComponentProps {
  response: []
  disabled?: boolean
  buttonTitle: string
  fromAddress: string
}
type Content = {
  dateSent: string
  dateReceived: string
  subject: string
}
interface ContentProps {
  response: Content[] | []
}
const columns: GridColDef[] = [
  { field: 'dateSent', headerName: 'Message Sent', minWidth: 200, flex: 0.5 },
  { field: 'subject', headerName: 'Subject', minWidth: 400, flex: 1 },
  { field: 'dateReceived', headerName: 'Message Received', minWidth: 200, flex: 0.5 },
]
const Content = ({ response }: ContentProps) => {
  return (
    <Box maxWidth="lg" sx={{ width: '100%' }}>
      {_.isEmpty(response) && <Typography>No results found</Typography>}
      {!_.isEmpty(response) && (
        <DataGrid
          columns={columns}
          rows={response}
          getRowId={() => Math.random()}
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          density={'comfortable'}
          autoHeight
        />
      )}
    </Box>
  )
}
const SendMessageResults = ({ response, buttonTitle, fromAddress }: ResultsComponentProps) => {
  return (
    <ResultsComponent
      response={response}
      buttonTitle={buttonTitle}
      loadingDialogTitle={'Searching for ' + fromAddress}
      loadingDialogContent={undefined}
      resultsDialogTitle={'Message Search Results for ' + fromAddress}
      resultsDialogContent={<Content response={response} />}
    />
  )
}

export default SendMessageResults
