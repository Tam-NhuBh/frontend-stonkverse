// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import course from "assets/images/course/course.jpg";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} image={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[8]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: 1,
            },

            "&:hover, &:focus": {
              zIndex: "",
            },
            
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "id", align: "center" },
      { name: "image", align: "center"},
      { name: "title", align: "center" },
      { name: "subtitle", align: "center" },
      { name: "members", align: "center" },
      { name: "price", align: "center" },
      { name: "rating", align: "center" },
      { name: "", align: "center" },
    ],

    rows: [
      {
        id:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            1
          </SoftTypography>

        ),
        image: (
          <img
            src={course}
            alt="Course"
            style={{ width: "80px", height: "auto" }} // Set the width to your desired size
          />
        ),

        title:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers
          </SoftTypography>
        ),
        
        subtitle: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers In White
          </SoftTypography>
        ),

        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team2, "Romina Hadid"],
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        price: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </SoftTypography>
        ),
        rating: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={60} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        id:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            2
          </SoftTypography>

        ),
          image: (
          <img
            src={course}
            alt="Course"
            style={{ width: "80px", height: "auto" }} // Set the width to your desired size
          />
        ),

        title:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Boots
          </SoftTypography>
        ),
        
        subtitle: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers In Blue
          </SoftTypography>
        ),

        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        price: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </SoftTypography>
        ),
        rating: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={10} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        id:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            3
          </SoftTypography>

        ),

        image: (
          <img
            src={course}
            alt="Course"
            style={{ width: "80px", height: "auto" }} // Set the width to your desired size
          />
        ),

        title:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers
          </SoftTypography>
        ),
        
        subtitle: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers In White
          </SoftTypography>
        ),
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team3, "Alexander Smith"],
            ])}
          </SoftBox>
        ),
        price: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </SoftTypography>
        ),
        rating: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        id:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            4
          </SoftTypography>

        ),

        image: (
          <img
            src={course}
            alt="Course"
            style={{ width: "80px", height: "auto" }} // Set the width to your desired size
          />
        ),

        title:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Boots
          </SoftTypography>
        ),
        
        subtitle: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers In Blue
          </SoftTypography>
        ),
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team4, "Jessica Doe"],
              [team3, "Alexander Smith"],
              [team2, "Romina Hadid"],
              [team1, "Ryan Tompson"],
            ])}
          </SoftBox>
        ),
        price: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </SoftTypography>
        ),
        rating: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        id:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            5
          </SoftTypography>

        ),

        image: (
          <img
            src={course}
            alt="Course"
            style={{ width: "80px", height: "auto" }} // Set the width to your desired size
          />
        ),

        title:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers
          </SoftTypography>
        ),
        
        subtitle: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers In White
          </SoftTypography>
        ),
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </SoftBox>
        ),
        price: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $500
          </SoftTypography>
        ),
        rating: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={25} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        id:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            6
          </SoftTypography>

        ),

        image: (
          <img
            src={course}
            alt="Course"
            style={{ width: "80px", height: "auto" }} // Set the width to your desired size
          />
        ),

        title:  (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Boots
          </SoftTypography>
        ),
        
        subtitle: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            Trainers In Blue
          </SoftTypography>
        ),
        members: (
          <SoftBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </SoftBox>
        ),
        price: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </SoftTypography>
        ),
        rating: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={40} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
    ],
  };
}
