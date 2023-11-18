import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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

// Auth
import AuthApi from "../../../api/auth";
import { useAuth } from "../../../auth-context/auth.context";

function SignIn() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    'username': '',
    'password': ''
  });

  const {
    authUser,
    setAuthUser,
    setIsLoggedIn,

  } = useAuth();


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleLogout = () => {
  //   // Thực hiện xử lý đăng xuất ở đây
  //   setIsLoggedIn(false);
  //   setAuthUser(null);
  //   localStorage.removeItem("user");

  const submitFormData = (e) => {
    e.preventDefault();
    AuthApi.Login(formData)
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
          setAuthUser(response.data.user);
          return setProfile(response.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          return setError(error.response.data.message);
        }
        return setError(error);
      });
  };

  const handleRedirect = () => {
    return navigate("/dashboard");
  };

  const setProfile = (response) => {
    let userData = { ...response.data.user };
    userData.token = response.data.token;
    userData = JSON.stringify(userData);
    
    setAuthUser({ ...response.data.user });
    localStorage.setItem("user", userData);

    return navigate("/dashboard");
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setIsLoading(true);

      const requestData = {
        code: newUrl[1],
      };

      AuthApi.Authorize(requestData.code)
        .then(({ data }) => {
          if (data.user) {
            setUser(JSON.stringify(data.user));
            localStorage.setItem("user", JSON.stringify(data.user));
            handleRedirect();
          } else {
            setError("no user returned");
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    authUser && authUser.token ? (
      <div>
        <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
        <SoftBox mt={4} mb={1}>
        <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={handleLogout}>
          Log Out
        </SoftButton>
      </SoftBox>
    </div>
    ) : (
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
        <SoftInput type="username" name="username" value={formData?.username} onChange={handleFormData} placeholder="username" />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={0} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Password
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="password"
          name="password"
          onChange={handleFormData}
          placeholder="Password"
          value={formData?.password}
        />
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

      <SoftBox mt={2} mb={2} textAlign="center">
        <h6
          style={{
            fontSize: ".8em",
            color: "red",
            textAlign: "center",
            fontWeight: 400,
            transition: ".2s all",
          }}
        >
          {String(error)}
        </h6>
      </SoftBox>

      <SoftBox mt={3} mb={1}>
        <SoftButton variant="gradient" color="info" fullWidth onClick={submitFormData}>
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
  ));
}

export default SignIn;
