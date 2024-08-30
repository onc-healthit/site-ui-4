import { Box } from '@mui/material'
import React from 'react'

interface ScorecardIssueDescriptionProps {
  description: string
}

export const ScorecardIssueDescription: React.FC<ScorecardIssueDescriptionProps> = ({ description }) => {
  // Split the description string by anchor tags and regular text
  const linkRegEx = /(<a[^>]+>.*?<\/a>)/g
  const extractedLinks = description.split(linkRegEx)

  return (
    <Box>
      {extractedLinks.map((curPart, index) => {
        // Check if the current part is a link...
        if (linkRegEx.test(curPart)) {
          const hrefMatch = curPart.match(/href="([^"]*)"/)
          let href = hrefMatch ? hrefMatch[1] : '#'
          href = href.replace('scorecard', 'c-cda/scorecard')
          const text = curPart.replace(/<[^>]+>/g, '') // Remove HTML tags to extract text
          return (
            <a key={index} href={href} download>
              {text}
            </a>
          )
        }

        // Otherwise, return the non-link text parts as they are
        return <span key={index}>{curPart}</span>
      })}
    </Box>
  )
}
