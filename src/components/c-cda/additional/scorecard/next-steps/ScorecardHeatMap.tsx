import palette from '@/styles/palette'
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material'

export default function ScorecardHeatMap() {
  // const chipFontSize: string = '100.5%'

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2} sx={{ mb: 4 }}>
      {/* TODO: Increase size of chips as a whole */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 2 }}>
        Scored Sections
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Chip
            label="Allergies A+"
            sx={{
              color: palette.white,
              backgroundColor: palette.successLight,
              '&:hover': {
                backgroundColor: palette.success,
                textDecoration: 'underline',
              },
              '&:visited': {
                color: palette.white,
              },
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label="Patient A+"
            sx={{
              color: palette.white,
              backgroundColor: palette.successLight,
              '&:hover': {
                backgroundColor: palette.success,
                textDecoration: 'underline',
              },
              '&:visited': {
                color: palette.white,
              },
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label="Procedures A-"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>2</Avatar>}
            sx={{
              color: palette.black,
              backgroundColor: palette.success,
              '&:hover': {
                backgroundColor: palette.successDark,
                textDecoration: 'underline',
              },
              '&:visited': {
                color: palette.white,
              },
            }}
            component="a"
            href="#Procedures"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Social History A-"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>3</Avatar>}
            sx={{
              color: palette.black,
              backgroundColor: palette.success,
              '&:hover': {
                backgroundColor: palette.successDark,
                textDecoration: 'underline',
              },
              '&:visited': {
                color: palette.white,
              },
            }}
            component="a"
            href="#SocialHistory"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Vital Signs B+"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>4</Avatar>}
            sx={{
              color: palette.black,
              backgroundColor: '#FFB65D75',
              '&:hover': {
                backgroundColor: '#FFB65D',
                textDecoration: 'underline',
              },
              '&:visited': {
                color: palette.black,
              },
            }}
            component="a"
            href="#VitalSigns"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            variant="filled"
            label="Immunizations B+"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>6</Avatar>}
            sx={{
              color: palette.black,
              backgroundColor: '#FFB65D75',
              '&:hover': {
                backgroundColor: '#FFB65D',
                textDecoration: 'underline',
              },
              '&:visited': {
                color: palette.black,
              },
            }}
            component="a"
            href="#Immunizations"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Medications C"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>9</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: '#C66D0065',
              '&:hover': {
                backgroundColor: '#C66D0090',
                textDecoration: 'underline',
              },
              '&:visited': {
                color: palette.black,
              },
            }}
            component="a"
            href="#Medications"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Problems D"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>22</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: '#6D0D0D',
              '&:hover': {
                backgroundColor: '#510808',
                textDecoration: 'underline',
                color: palette.errorDark,
              },
              '&:visited': {
                color: palette.white,
              },
            }}
            component="a"
            href="#Problems"
            clickable
          />
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ fontWeight: 'bold', pt: 2, pb: 2 }}>
        Unscored Sections
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Chip
            variant="outlined"
            label="Miscellaneous: No information for this section"
            sx={{ color: palette.black, backgroundColor: palette.greyLight }}
          />
        </Grid>
        <Grid item>
          <Chip
            label="Encounters: Conformance Errors"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>2</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: palette.greyDark,
              '&:hover': {
                backgroundColor: palette.black,
                textDecoration: 'underline',
                color: palette.white,
              },
              '&:visited': {
                color: palette.white,
              },
            }}
            component="a"
            href="#ConformanceErrors"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Lab Result: Vocabulary Errors"
            avatar={<Avatar sx={{ bgcolor: palette.white }}>1</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: palette.greyDark,
              '&:hover': {
                backgroundColor: palette.black,
                textDecoration: 'underline',
                color: palette.white,
              },
              '&:visited': {
                color: palette.white,
              },
            }}
            component="a"
            href="#VocabularyErrors"
            clickable
          />
        </Grid>
      </Grid>
    </Box>
  )
}
