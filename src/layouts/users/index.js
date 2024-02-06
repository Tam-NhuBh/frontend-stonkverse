import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import SoftInput from "components/SoftInput";
import Divider from "@mui/material/Divider";
import ExcelIcon from "@mui/icons-material/InsertDriveFile"; // Thay thế bằng biểu tượng Excel tương ứng
import IconPdf from "@mui/icons-material/PictureAsPdf";
import {
  // Các imports khác
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,

} from "@mui/material";
import { GetApp as GetAppIcon, FilterList as FilterListIcon, ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PrintIcon from "@mui/icons-material/Print";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Data
import authorsTableData from "layouts/users/data/index";


function Users() {
  const { columns, rows } = authorsTableData;
  const totalUsers = 100; // Replace with the actual total number of users
  const onlineUsers = 55; // Replace with the actual number of online users
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Set the number of rows per page as needed

  const percentageValue = (onlineUsers / totalUsers) * 100;
  const percentageText = `${Math.round(percentageValue)}%`;
  const [adminSwitches, setAdminSwitches] = useState({
    0: false, // Dòng 0: Admin không bật công tắc
    1: false, // Dòng 1
    2: false, // Dòng 2
    // ... thêm nếu cần
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Hàm xử lý khi công tắc thay đổi
  const handleAdminSwitchChange = (rowIndex) => {
    setAdminSwitches((prevSwitches) => ({
      ...prevSwitches,
      [rowIndex]: !prevSwitches[rowIndex],
    }));
  };

  const handleExportClick = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleCopyClick = () => {
    // Xử lý khi người dùng click vào mục Copy
    // Đặt mã xử lý ở đây
    console.log("Copy clicked");
    // Ví dụ: alert("Copy clicked");
  };

  const handlePrintClick = () => {
    // Xử lý khi người dùng click vào mục Copy
    // Đặt mã xử lý ở đây
    console.log("Print clicked");
    // Ví dụ: alert("Copy clicked");
  };
  const isFilterMenuOpen = Boolean(filterAnchorEl);


  return (
    <DashboardLayout>
      <DashboardNavbar />
        <SoftBox py={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} >
                <MiniStatisticsCard
                  title={{ text: "Total Users" }}
                  count={totalUsers.toString()}
                  icon={{ color: "info", component: "people" }}
                />
                
              </Grid>

              <Grid item xs={12} sm={6} >
                <MiniStatisticsCard
                  title={{ text: "Active Members" }}
                  count={totalUsers.toString()}
                  percentage={{ color: "success", text: percentageText }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>

            </Grid>

            <SoftBox py={3}>
              <SoftBox mb={3}>
                <Card>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    {/* Khung Search */}
                    <SoftInput
                      placeholder="Search users..."
                      icon={{ component: "search", direction: "left" }}
                    />  
   
                    {/* Khung Export và Filter */}
                    <div>
                      <IconButton onClick={handleExportClick}>
                        <GetAppIcon />
                        <SoftTypography variant="body2" sx={{ marginLeft: 1 }}>
                          Export
                        </SoftTypography>
                        <ArrowDropDownIcon />
                      </IconButton>
                      
                      <Menu
                        anchorEl={exportAnchorEl}
                        open={Boolean(exportAnchorEl)}
                        onClose={handleExportClose}
                        >
                        <MenuItem>
                          <SoftTypography variant="body2" fontWeight="bold">
                            Options
                          </SoftTypography>
                        </MenuItem>
                          
                          <List>
                            <ListItem onClick={handleCopyClick}>
                              <ListItemText
                                sx={{ paddingLeft: "25px" }} // Số px bạn muốn lùi vào trong
                              >
                                <Typography variant="body2" sx={{ fontSize: 17, display: "flex", alignItems: "center" }}>
                                  <FileCopyIcon sx={{ marginRight: 1 }} />
                                  Copy
                                </Typography>
                              </ListItemText>
                            </ListItem>
                            
                            <ListItem onClick={handlePrintClick}>
                              <ListItemText
                                sx={{ paddingLeft: "25px" }} // Số px bạn muốn lùi vào trong
                              >
                                <Typography variant="body2" sx={{ fontSize: 17, display: "flex", alignItems: "center" }}>
                                  <PrintIcon sx={{ marginRight: 1 }} />
                                  Print
                                </Typography>
                              </ListItemText>
                            </ListItem>
                          </List>

                          <Divider variant="middle" sx={{ margin: '0' }} />
                          <MenuItem>
                            <SoftTypography variant="body2" fontWeight="bold">
                              Download Options
                            </SoftTypography>
                          </MenuItem>                      
                
                        <List>
                          <ListItem onClick={handleCopyClick}>
                            <ListItemText
                              sx={{ paddingLeft: "25px" }} // Số px bạn muốn lùi vào trong
                            >
                            <Typography variant="body2" sx={{ fontSize: 17, display: "flex", alignItems: "center" }}>
                              <ExcelIcon sx={{ color: "#008000", marginRight: 1 }} /> {/* Thay thế bằng màu của Excel */}
                                Excel
                            </Typography>
                            </ListItemText>
                          </ListItem>
                          
                          <ListItem onClick={handlePrintClick}>
                            <ListItemText
                              sx={{ paddingLeft: "25px" }} // Số px bạn muốn lùi vào trong
                            >
                              <Typography variant="body2" sx={{ fontSize: 17, display: "flex", alignItems: "center" }}>
                                <IconPdf sx={{ marginRight: 1, color: "#CC0000	" }} />
                                PDF
                              </Typography>
                            </ListItemText>
                          </ListItem>
                        </List>
                      </Menu>
        
                    </div>
                  </SoftBox>

                <SoftBox
                  sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                      "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                          `${borderWidth[1]} solid ${borderColor}`,
                      },
                    },
                  }}
                >
                    <Table
                      columns={columns}
                      rows={rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => ({
                        ...row,
                        role: (
                          <div style={{ display: "flex", alignItems: "center" }}>
                            {/* Công tắc bật/tắt của MUI */}
                            <Switch
                              checked={adminSwitches[index + page * rowsPerPage]}
                              onChange={() => handleAdminSwitchChange(index + page * rowsPerPage)}
                            />

                            {/* Hiển thị trạng thái tùy thuộc vào giá trị của công tắc */}
                            <span style={{ marginLeft: "5px" }}>
                              {adminSwitches[index + page * rowsPerPage] ? "Admin" : "User"}
                            </span>
                            
                          </div>
                        ),
                        
                      }))}
                    />

                    <TablePagination
                      component="div"
                      count={rows.length}
                      page={page}
                      onPageChange={(event, newPage) => setPage(newPage)}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                      }}
                      labelRowsPerPage="Rows per page:"
                      labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    />
                </SoftBox>
                
              </Card>
            </SoftBox>
          </SoftBox>
          <Footer />
        </SoftBox>
    </DashboardLayout>
  );
}

export default Users;
