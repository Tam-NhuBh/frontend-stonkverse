/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// DeleteUser component
function DeleteUser({ onClick }) {
  return (
    <SoftTypography
      component="a"
      href="#"
      variant="caption"
      color="error" // Use your preferred color for delete action
      fontWeight="medium"
      onClick={onClick}
    >
      Delete
    </SoftTypography>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

const authorsUserData = {
  columns: [
    { name: "id", align: "center" },
    { name: "user", align: "center" },
    { name: "function", align: "center" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    {
      name: "action", // New column for Delete user
      align: "center",
      // Custom render function for the DeleteUser component
      render: (rowData) => <DeleteUser onClick={() => handleDeleteUser(rowData)} />,
    },

    { name: "role", align: "center" },


  ],

  rows: [
    {
      id:  (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          1
        </SoftTypography>

      ),
      user: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      function: <Function job="Manager" org="Organization" />,
      status: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </SoftTypography>
      ),
      action: (
        <DeleteUser onClick={() => handleDeleteUser(rowData)} />
      ),

    },
    {
      id:  (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          2
        </SoftTypography>

      ),
      user: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      function: <Function job="Programator" org="Developer" />,
      status: (
        <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </SoftTypography>
      ),
      action: (
        <DeleteUser onClick={() => handleDeleteUser(rowData)} />
      ),
    },
    {
      id:  (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          3
        </SoftTypography>

      ),
      user: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      function: <Function job="Executive" org="Projects" />,
      status: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          19/09/17
        </SoftTypography>
      ),
      action: (
        <DeleteUser onClick={() => handleDeleteUser(rowData)} />
      ),

    },
    {
      id:  (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          4
        </SoftTypography>

      ),
      user: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      function: <Function job="Programator" org="Developer" />,
      status: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          24/12/08
        </SoftTypography>
      ),
      action: (
        <DeleteUser onClick={() => handleDeleteUser(rowData)} />
      ),


    },
    {
      id:  (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          5
        </SoftTypography>

      ),
      user: <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
      function: <Function job="Manager" org="Executive" />,
      status: (
        <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          04/10/21
        </SoftTypography>
      ),
      action: (
        <DeleteUser onClick={() => handleDeleteUser(rowData)} />
      ),


    },
    {
      id:  (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          6
        </SoftTypography>

      ),
      user: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      function: <Function job="Programtor" org="Developer" />,
      status: (
        <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          14/09/20
        </SoftTypography>
      ),
      action: (
        <DeleteUser onClick={() => handleDeleteUser(rowData)} />
      ),
    },
  ],
};

export default authorsUserData;
