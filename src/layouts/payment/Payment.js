// Import necessary libraries and components
import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import SoftBox from 'components/SoftBox';
import Grid from '@mui/material/Grid';
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import Projects from 'layouts/dashboard/components/Projects';
import OrderOverview from 'layouts/dashboard/components/OrderOverview';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Footer from 'examples/Footer';
import Button from "@mui/material/Button";

// Define your transaction data and columns
const transactionsData = [
  { id: 1, user: 'User A', course: 'Course A', amount: 50 },
  { id: 2, user: 'User B', course: 'Course B', amount: 30 },
  { id: 3, user: 'User B', course: 'Course B', amount: 30 },
  { id: 4, user: 'User B', course: 'Course B', amount: 30 },
  { id: 5, user: 'User B', course: 'Course B', amount: 30 },
  { id:6, user: 'User B', course: 'Course B', amount: 30 },

  // Add more transaction data as needed
];

const transactionColumns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'user', headerName: 'User', width: 250 },
  { field: 'course', headerName: 'Course', width: 250 },
  { field: 'amount', headerName: 'Amount', width: 200 },
  // Add more columns as needed
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <>
        <Button variant="outlined" size="small" style={{ color: "#fff", backgroundColor: "green" }} 
        >
          Edit
        </Button>
        <Button variant="outlined" size="small" style={{ color: "#fff", backgroundColor: "red" }} >
          Delete
        </Button>
      </>
    ),
  },
];

// Calculate total and remaining amounts
const getTotalAmount = () => transactionsData.reduce((total, transaction) => total + transaction.amount, 0);
const getRemainingAmount = () => transactionsData.reduce((total, transaction) => total - transaction.amount, getTotalAmount());

// Define doughnut chart data
const doughnutData = {
  labels: ['Paid', 'Remaining'],
  datasets: [
    {
      data: [getTotalAmount(), getRemainingAmount()],
      backgroundColor: ['#36a2eb', '#FFCE56'],
    },
  ],
};

// Define bar chart data
const barChartData = {
  labels: transactionsData.map(item => item.user),
  datasets: [
    {
      label: 'Amount',
      backgroundColor: '#8884d8',
      borderColor: '#8884d8',
      borderWidth: 1,
      hoverBackgroundColor: '#8884d8',
      hoverBorderColor: '#8884d8',
      data: transactionsData.map(item => item.amount),
    },
  ],
};

function Payment() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
            <Grid container spacing={3} justifyContent="center">
            {/* Doughnut Chart */}
            <Grid item xs={12} lg={3.9}>
              <Card>
                <SoftBox p={2}>
                  <Doughnut data={doughnutData} />
                </SoftBox>
              </Card>
            </Grid>

            {/* Bar Chart */}
            <Grid item xs={12} lg={7.2}>
              <Card>
                <SoftBox p={2}>
                  <Bar data={barChartData} />
                </SoftBox>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>

        {/* DataGrid */}
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={2}>
              <DataGrid
                rows={transactionsData}
                columns={transactionColumns}
                pageSize={5}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
              />
            </SoftBox>
          </Card>
        </SoftBox>

        {/* Additional content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Payment;
