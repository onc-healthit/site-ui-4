import Box from "@mui/material/Box"
import BannerBox from "./BannerBox"
import Link from "@mui/material/Link"
import CriteriaCard from "./CriteriaCard"
import b1 from "@/../public/b1.svg"
import h1 from "@/../public/h1.svg"
import h2 from "@/../public/h2.svg"
import { Container, Grid, Typography } from "@mui/material"

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
        <Box p={4}>
        <Typography variant="h2" component={"h2"}>
          Test By Criteria
        </Typography>
        <Typography variant="body1" color="secondary">
          <strong>A deep dive with one click away</strong>
        </Typography></Box>
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
      </Container>
    </Box>
  );
};

export default DirectHome
