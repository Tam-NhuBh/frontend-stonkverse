// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

function Footer({links }) {
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SoftTypography variant="button" fontWeight="regular" color="black">
            {link.name}
          </SoftTypography>

          <Icon color="inherit" fontSize="inherit">
                {link.icon}
          </Icon>
        </Link>
      </SoftBox>
    ));

  return (
    <SoftBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
        >
      
        <SoftBox fontSize={size.md} color="black" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </SoftBox>
        <SoftBox fontSize={size.defaultProps} color="black" mb={-0.5} mx={0.25}>
            Welcome to become a member of our site. Hope you have a great experience
         </SoftBox>
          <SoftBox fontSize={size.md} color="black" mb={-0.5} mx={0.25}>
            <Icon color="inherit" fontSize="inherit">
              favorite
            </Icon>
          </SoftBox>
        </SoftBox>

      <SoftBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
        >
        {renderLinks()}
      </SoftBox>

      
    </SoftBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  links: [
    { name: "Contact Us:"},
    { href: "https://www.facebook.com/tam.nhubh/", icon: <FacebookIcon fontSize="small"/> },
    { href: "https://github.com/namnothere/frontend-stonkverse", icon: <GitHubIcon fontSize="small"/> },
    { href: "https://www.facebook.com/tam.nhubh/", icon: <TwitterIcon fontSize="small"/> },
    { href: "https://www.instagram.com/into.tnhubh/", icon: <InstagramIcon fontSize="small"/> },

  ],

};

// Typechecking props for the Footer
Footer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
