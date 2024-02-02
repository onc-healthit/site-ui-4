import BannerBox from '@shared/BannerBox'
import SiteHomeRows from './SiteHomeRows'

export default function SiteHome() {
  return (
    <main>
      {/* Header */}
      <BannerBox
        breadcrumbs={undefined}
        heading={'Welcome to the ONC SITE'}
        subHeading={'The hub for testing tools & resources'}
        isTourButton={true}
        description={
          <>
            The Standards Implementation & Testing Environment (SITE) is a centralized collection of testing tools and
            resources designed to assist health IT developers and health IT users fully evaluating specific technical
            standards and maximizing the potential of their health IT implementations. SITE is organized in a collection
            of sandboxes that provide test tools, sample data, collaboration resources, and useful links.
          </>
        }
      />
      {/* Main Content */}
      <SiteHomeRows />
    </main>
  )
}
