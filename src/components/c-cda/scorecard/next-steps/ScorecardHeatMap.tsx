import palette from '@/styles/palette'
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material'
import { SectionNameEnum } from '../types/ScorecardConstants'

export default function ScorecardHeatMap() {
  const chipFontSize: string = '115%'

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2} sx={{ mb: 4 }}>
      {/* TODO: Increase size of chips as a whole */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 2 }}>
        Scored Sections
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.ALLERGIES} A+`}
            sx={{
              color: palette.white,
              backgroundColor: palette.successLight,
              '&:hover': {
                cursor: 'not-allowed',
              },
              fontSize: chipFontSize,
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.PATIENT_DEMOGRAPHICS} A+`}
            sx={{
              color: palette.white,
              backgroundColor: palette.successLight,
              '&:hover': {
                cursor: 'not-allowed',
              },
              fontSize: chipFontSize,
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.PROCEDURES} A-`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>2</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: palette.success,
              '&:hover': {
                backgroundColor: palette.successDark,
                textDecoration: 'underline',
              },
              fontSize: chipFontSize,
            }}
            component="a"
            href="#Procedures"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.SOCIAL_HISTORY} A-`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>3</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: palette.success,
              '&:hover': {
                backgroundColor: palette.successDark,
                textDecoration: 'underline',
              },
              fontSize: chipFontSize,
            }}
            component="a"
            href="#SocialHistory"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.VITAL_SIGNS} B+`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>4</Avatar>}
            sx={{
              color: palette.black,
              backgroundColor: '#FFB65D75',
              '&:hover': {
                backgroundColor: '#FFB65D',
                textDecoration: 'underline',
              },
              fontSize: chipFontSize,
            }}
            component="a"
            href="#VitalSigns"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            variant="filled"
            label={`${SectionNameEnum.IMMUNIZATIONS} B+`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>6</Avatar>}
            sx={{
              color: palette.black,
              backgroundColor: '#FFB65D75',
              '&:hover': {
                backgroundColor: '#FFB65D',
                textDecoration: 'underline',
              },
              fontSize: chipFontSize,
            }}
            component="a"
            href="#Immunizations"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.MEDICATIONS} C`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>9</Avatar>}
            sx={{
              color: palette.black,
              backgroundColor: '#C66D0065',
              '&:hover': {
                backgroundColor: '#C66D0090',
                textDecoration: 'underline',
              },
              fontSize: chipFontSize,
            }}
            component="a"
            href="#Medications"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.PROBLEMS} D`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>22</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: '#6D0D0D',
              '&:hover': {
                backgroundColor: '#510808',
                textDecoration: 'underline',
              },
              fontSize: chipFontSize,
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
            label={`${SectionNameEnum.MISCELLANEOUS}: No data in submitted document`}
            sx={{
              color: palette.black,
              backgroundColor: palette.greyLight,
              '&:hover': {
                cursor: 'not-allowed',
              },
              fontSize: chipFontSize,
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.ENCOUNTERS}: Conformance Errors`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>2</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: palette.greyDark,
              '&:hover': {
                backgroundColor: palette.black,
                textDecoration: 'underline',
                color: palette.white,
              },
              fontSize: chipFontSize,
            }}
            component="a"
            href="#ConformanceErrors"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label={`${SectionNameEnum.LABORATORY_TESTS_AND_RESULTS}: Vocabulary Errors`}
            avatar={<Avatar sx={{ bgcolor: palette.white }}>1</Avatar>}
            sx={{
              color: palette.white,
              backgroundColor: palette.greyDark,
              '&:hover': {
                backgroundColor: palette.black,
                textDecoration: 'underline',
                color: palette.white,
              },
              fontSize: chipFontSize,
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
