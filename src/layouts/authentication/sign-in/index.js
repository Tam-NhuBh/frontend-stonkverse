import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout
      title="Welcome back"
      description="Enter your username and password to log in our site."
      image={curved6}
    >
      <Card>
      <SoftBox p={3} mb={1} textAlign="center">
        <SoftTypography variant="h5" fontWeight="medium">
          Sign In with
        </SoftTypography>
      </SoftBox>
      <SoftBox mb={2}>
        <Socials />
      </SoftBox>
      <Separator />
      <SoftBox pt={-2} pb={3} px={3}>
      <SoftBox component="form" role="form">
      <SoftBox mb={2}>
        <SoftBox mb={0} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
          Username
          </SoftTypography>
        </SoftBox>
        <SoftInput type="username" placeholder="Username" />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={0} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Password
          </SoftTypography>
        </SoftBox>
        <SoftInput type="password" placeholder="Password" />
      </SoftBox>
      <SoftBox display="flex" alignItems="center">
        <Switch checked={rememberMe} onChange={handleSetRememberMe} />
        <SoftTypography
          variant="button"
          fontWeight="regular"
          onClick={handleSetRememberMe}
          sx={{ cursor: "pointer", userSelect: "none" }}
        >
          &nbsp;&nbsp;Remember me
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={3} mb={1}>
        <SoftButton variant="gradient" color="info" fullWidth>
          sign in
        </SoftButton>
      </SoftBox>
      <SoftBox mt={2} textAlign="center">
        <SoftTypography variant="button" color="text" fontWeight="regular">
          Don&apos;t have an account?{" "}
          <SoftTypography
            component={Link}
            to="/authentication/sign-up"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            Sign up
          </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
    </BasicLayout>
  );
}

export default SignIn;
