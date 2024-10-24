import BannerBox from '@shared/BannerBox'
import SiteHomeRows from './SiteHomeRows'
import { Typography } from '@mui/material'

const headingHome = (
  <Typography component="h1" variant="inherit" pb={1}>
    Welcome to the Assistant Secretary for <br /> Technology Policy Standards Implementation & Testing Environment
    (SITE)
  </Typography>
)
export default function SiteHome() {
  return (
    <main>
      {/* Header */}
      <BannerBox
        breadcrumbs={undefined}
        heading={headingHome}
        subHeading={'The hub for testing tools & resources'}
        isTourButton={true}
        description={
          <>
            SITE is a centralized collection of testing tools and resources designed to assist health IT developers and
            health IT users fully evaluating specific technical standards and maximizing the potential of their health
            IT implementations. SITE is organized in a collection of sandboxes that provide test tools, sample data,
            collaboration resources, and useful links.
          </>
        }
      />
      {/* Main Content */}
      <SiteHomeRows />
    </main>
  )
}
