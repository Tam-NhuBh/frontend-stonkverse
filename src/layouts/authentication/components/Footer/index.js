// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Footer() {
  return (
    <SoftBox component="footer" py={1}>
      <Grid container justifyContent="center">
                
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <SoftTypography variant="body2" color="secondary"  sx={{ marginTop: "50px" }}>
              Please contact us here if you have any questions
          </SoftTypography>
        </Grid>

        <Grid item xs={12} lg={8}>
          <SoftBox display="flex" justifyContent="center" mt={1} mb={1}>
            <SoftBox mr={3} color="secondary">
              <FacebookIcon fontSize="large" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <TwitterIcon fontSize="large" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <InstagramIcon fontSize="large" />
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Footer;
