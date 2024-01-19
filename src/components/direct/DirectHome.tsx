import Box from "@mui/material/Box"
import BannerBox from "./BannerBox"
import Link from "@mui/material/Link"
import CriteriaCard from "./CriteriaCard"
import b1 from "@/../public/b1.svg"
import h1 from "@/../public/h1.svg"
import h2 from "@/../public/h2.svg"
import { Container, Divider, Grid, Typography } from "@mui/material"
import CategoryCard from "./CategoryCard"
import CertificateCard from "./CertificateCard"
import publicCert from "@/../public/publicCert.svg"
import trustAnchor from "@/../public/trustAnchor.svg"
import invalidTrustAnchor from "@/../public/invalidTrustAnchor.svg"
import rootCA from "@/../public/rootCA.svg"

const DirectHome = () => {
  return (
    <Box>
      <BannerBox
        title={"Direct"}
        href={"/direct"}
        heading={"Direct Project Tooling"}
        description={
          <>
            This area provides capabilities to validate your Direct
            implementation to applicable standards-specifications. To verify
            basic Direct send capabilities of your system send a message to:
            <span>
              <Link
                underline="hover"
                color="#42A5F5"
                href="mailto:testing@ett.healthit.gov"
              >
                testing@ett.healthit.gov
              </Link>
            </span>
          </>
        }
      />
      <Container>
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h3" component={"h2"}>
            Test By Criteria
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>A deep dive with one click away</strong>
          </Typography>
        </Box>
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <CriteriaCard
            title={"B1"}
            cardImage={b1}
            cardHeader={"Transitions of Care"}
            cardSubheader={"170.315 (b)(1):"}
            description={
              "Sender Or Receiver. We have group all the test regarding this... to help user ... do this."
            }
          />

          <CriteriaCard
            title={"H1"}
            cardImage={h1}
            cardHeader={"Direct Project"}
            cardSubheader={"§ 170.315(h)(1)"}
            description={
              "Sender Or Receiver. We have group all the test regarding this... to help user ... do this."
            }
          />

          <CriteriaCard
            title={"H2"}
            cardImage={h2}
            cardHeader={"Direct Project, Edge Protocol, and XDR/XDM"}
            cardSubheader={"§ 170.315(h)(2)"}
            description={
              "Sender Or Receiver. We have group all the test regarding this... to help user ... do this."
            }
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 5 }} />
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h3" component={"h2"}>
            Select a category to start your direct project tooling.
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>All Direct in One Place</strong>
          </Typography>
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          paddingBottom={4}
        >
          <CategoryCard
            cardHeader="Register for Direct Email"
            description={
              "Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing."
            }
          />
          <CategoryCard
            cardHeader="Send Direct Email"
            description={
              "Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing."
            }
          />
          <CategoryCard
            cardHeader="Validate Direct Email"
            description={
              "Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing."
            }
          />
        </Box>
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <CategoryCard
            cardHeader="Discovery Test Tool"
            description={
              "Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing."
            }
          />
          <CategoryCard
            cardHeader="Transport Test Tool"
            description={
              "Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing."
            }
          />
          <CategoryCard
            cardHeader="HISP Testing Portal"
            description={
              "Enter your Direct (From) email address, this will be used to send a validation report to a normal email account. The validation reports are sent back to the email account for review by the user during testing."
            }
          />
        </Box>
        <Divider sx={{ p: 2, borderBottomWidth: 5 }} />
        <Box paddingTop={4} paddingBottom={4}>
          <Typography variant="h3" component={"h2"}>
            Certification for Download
          </Typography>
          <Typography variant="body1" color="secondary">
            <strong>Tagline</strong>
          </Typography>
        </Box>
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <CertificateCard
            title={"Public Cert"}
            cardImage={publicCert}
            cardHeader={"ETT Public Cert"}
            description={
              "The ETT Public Cert is used for the signing of Direct messages."
            }
          />
          <CertificateCard
            title={"Trust Anchor"}
            cardImage={trustAnchor}
            cardHeader={"Trust Anchor"}
            description={
              "The ETT Public Cert is used for the signing of Direct messages."
            }
          />
          <CertificateCard
            title={"Invalid Trust Achor"}
            cardImage={invalidTrustAnchor}
            cardHeader={"Invalid Trust Anchor"}
            description={
              "The ETT Public Cert is used for the signing of Direct messages."
            }
          />
          <CertificateCard
            title={"Root CA"}
            cardImage={rootCA}
            cardHeader={"Public Root CA"}
            description={
              "The ETT Public Cert is used for the signing of Direct messages."
            }
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DirectHome
