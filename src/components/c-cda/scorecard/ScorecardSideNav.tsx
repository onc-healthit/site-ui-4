import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, List, MenuItem } from '@mui/material'
import { useState } from 'react'
import {
  getCategorySideNavText,
  getHrefLinkValue,
  getNumberOfIssuesForDisplay,
} from './serverside/scorecardHelperService'
import { HrefLinkValueEnum } from './types/ScorecardConstants'
import { ScorecardCategory, ScorecardResultsType } from './types/ScorecardJsonResponseType'

interface ScorecardSideNavProps {
  results: ScorecardResultsType | undefined
}

export default function ScorecardSideNav({ results }: ScorecardSideNavProps) {
  const sections: ScorecardCategory[] | undefined = results?.categoryList

  const [expanded, setExpanded] = useState(true)
  const handleExpandChange = () => {
    setExpanded(!expanded)
  }

  const menuItemStyle = {
    fontWeight: 'bold',
    py: 1,
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none',
    },
  }

  return (
    <List>
      <MenuItem component="a" sx={menuItemStyle} href={HrefLinkValueEnum.BASE_CHECK}>
        Base Check
      </MenuItem>
      <MenuItem component="a" sx={menuItemStyle} href={HrefLinkValueEnum.BEST_PRACTICE}>
        Best Practice
      </MenuItem>
      <MenuItem component="a" sx={menuItemStyle} href={HrefLinkValueEnum.COMPARE}>
        Compare
      </MenuItem>
      <MenuItem component="a" sx={menuItemStyle} href={HrefLinkValueEnum.NEXT_STEPS}>
        Next Steps
      </MenuItem>
      {/* <MenuItem component="a" sx={menuItemStyle} href={HrefLinkValueEnum.DETAILED_RESULTS}>
        Detailed Results
      </MenuItem> */}
      <Box sx={{ fontWeight: 'bold' }}>
        <Accordion expanded={expanded} onChange={handleExpandChange} disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Sections with Issues</AccordionSummary>
          <AccordionDetails>
            {sections?.map(
              (section, index) =>
                (section.numberOfIssues > 0 || section.failingConformance || section.certificationFeedback) && (
                  <MenuItem
                    key={`${section.categoryName}-${section.categoryNumericalScore}-${index}`}
                    component="a"
                    sx={menuItemStyle}
                    href={getHrefLinkValue(section)}
                  >
                    ({getNumberOfIssuesForDisplay(section)}) {getCategorySideNavText(section)}
                  </MenuItem>
                )
            )}
          </AccordionDetails>
        </Accordion>
        {/* // Original static example, useful as a reference  */}
        {/* <Accordion expanded={expanded} onChange={handleExpandChange} disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Categories</AccordionSummary>
          <AccordionDetails>
            <MenuItem component="a" sx={menuItemStyle} href="#problems">
              (1) {SectionNameEnum.PROBLEMS} A+
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#medications">
              (1) {SectionNameEnum.MEDICATIONS} A+
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#allergies">
              (2) {SectionNameEnum.ALLERGIES} A-
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#procedures">
              (4) {SectionNameEnum.PROCEDURES} B+
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#vital-signs">
              (4) {SectionNameEnum.VITAL_SIGNS} B+
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#immunizations">
              (6) {SectionNameEnum.IMMUNIZATIONS} B-
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#laboratory-tests-and-results">
              (10) {SectionNameEnum.LABORATORY_TESTS_AND_RESULTS_SHORT} C
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#patient-demographics">
              (17) {SectionNameEnum.PATIENT_DEMOGRAPHICS_SHORT} D
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#encounters">
              (9) {SectionNameEnum.ENCOUNTERS} D
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#social-History">
              (5) {SectionNameEnum.SOCIAL_HISTORY} D
            </MenuItem>
            <MenuItem component="a" sx={menuItemStyle} href="#miscellaneous">
              (22) {SectionNameEnum.MISCELLANEOUS} D
            </MenuItem>
          </AccordionDetails>
        </Accordion> */}
      </Box>
    </List>
  )
}
