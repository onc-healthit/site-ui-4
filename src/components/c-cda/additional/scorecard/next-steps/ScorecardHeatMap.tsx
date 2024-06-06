import palette from '@/styles/palette'
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material'

export default function ScorecardHeatMap() {
  // const chipFontSize: string = '100.5%'

  return (
    <Box sx={{ pb: 2 }}>
      {/* TODO: Increase size of chips as a whole */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 2 }}>
        Scored Sections
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Chip label="Allergies A+" sx={{ color: palette.white, backgroundColor: palette.successLight }} />
        </Grid>
        <Grid item>
          <Chip label="Patient A+" sx={{ color: palette.white, backgroundColor: palette.successLight }} />
        </Grid>
        <Grid item>
          <Chip
            label="Procedures A-"
            avatar={<Avatar>2</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.success }}
            // sx={{ color: palette.white, backgroundColor: palette.success, fontSize: chipFontSize }}
            component="a"
            href="#Procedures"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Social History A-"
            avatar={<Avatar>3</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.success }}
            component="a"
            href="#SocialHistory"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Vital Signs B+"
            avatar={<Avatar>4</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.warning }}
            component="a"
            href="#VitalSigns"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Immunizations B+"
            avatar={<Avatar>6</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.warning }}
            component="a"
            href="#Immunizations"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Medications C"
            avatar={<Avatar>9</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.error }}
            component="a"
            href="#Medications"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Problems D"
            avatar={<Avatar>22</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.errorDark }}
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
            label="Miscellaneous: Empty Section"
            sx={{ color: palette.black, backgroundColor: palette.greyLight }}
          />
        </Grid>
        <Grid item>
          <Chip
            label="Encounters: Conformance Errors"
            avatar={<Avatar>2</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.black }}
            component="a"
            href="#ConformanceErrors"
            clickable
          />
        </Grid>
        <Grid item>
          <Chip
            label="Lab Result: Vocabulary Errors"
            avatar={<Avatar>1</Avatar>}
            sx={{ color: palette.white, backgroundColor: palette.black }}
            component="a"
            href="#VocabularyErrors"
            clickable
          />
        </Grid>
      </Grid>
    </Box>
  )
}
