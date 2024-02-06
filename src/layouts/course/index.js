import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import SoftInput from "components/SoftInput";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FilterList as FilterListIcon, ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";  // Import thư viện Link từ React Router
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon from MUI library

import {
  MenuItem,
  List,
  ListItem,
  ListItemText,
   MenuList,
  Paper,
  Typography,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon from MUI library


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import dataTable from "layouts/course/components/data/index";

function Course() {
  const { columns, rows } = dataTable();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [showFilterInfo, setShowFilterInfo] = useState(false);

  // Thêm state để theo dõi nút "More" hiện tại được bấm
  const [activeMoreIndex, setActiveMoreIndex] = useState(null);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
    setShowFilterInfo(!showFilterInfo);
  };

  const MoreClick = (index) => {
    setActiveMoreIndex(activeMoreIndex === index ? null : index);
  };

  const handleCopyClick = () => {
    // Xử lý khi người dùng click vào mục Copy
    // Đặt mã xử lý ở đây
    console.log("Copy clicked");
    // Ví dụ: alert("Copy clicked");
  };

  const tags = ["VietNam", "US", "Chinese", "Canada"];
  const ratings = ["Rating 1", "Rating 2", "Rating 3", "Rating 4", "Rating 5"];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div>
                <IconButton onClick={handleFilterClick}>
                  <FilterListIcon />
                  <SoftTypography variant="body2" sx={{ marginLeft: 1 }}>
                    Filter
                  </SoftTypography>
                  <ArrowDropDownIcon />
                </IconButton>
              </div>

              <div>
              {/* Sử dụng Link để dẫn đến trang "/addCourse" */}
              <Link to="/addCourse">
              <Button
                variant="contained"
                sx={{ backgroundColor: '#02CBEC', color: 'white'}}
                startIcon={<AddIcon style={{ color: 'white' }} />} // Đặt màu trắng cho biểu tượng
              >
                <span style={{ textTransform: 'none', color: 'white' }}>Add Course</span>
              </Button>
            </Link>
            
            
            </div>
          </SoftBox>

            {showFilterInfo && (
              <SoftBox>
                <Divider variant="middle" sx={{ margin: '0' }}/>
                <Grid container spacing={3} display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <Grid item xs={3} >
                    <List>
                      <ListItem>
                        <ListItemText>
                          <SoftTypography variant="body2">Title</SoftTypography>
                          <SoftInput
                            placeholder="Search title..."
                            icon={{ component: "search", direction: "left" }}
                          />
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={5}>
                    <List>
                      <ListItem>
                        <ListItemText>
                          <SoftTypography variant="body2">Tags</SoftTypography>
                          <Autocomplete
                            multiple
                            options={tags}
                            freeSolo
                            renderInput={(params) => <TextField {...params} placeholder="Search tags..." variant="outlined" />}
                          />
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={4}>
                    <List>
                      <ListItem>
                        <ListItemText>
                          <SoftTypography variant="body2">Rating</SoftTypography>
                          <Autocomplete
                            freeSolos
                            options={ratings}
                            renderInput={(params) => <TextField {...params} placeholder="Search ratings..." variant="outlined" />}
                          />
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </SoftBox>
            )}

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
                    "": (
                      <div style={{ position: "relative" }}>
                        <IconButton onClick={() => MoreClick(index)} variant="text">
                          <SoftTypography variant="caption" fontWeight="medium">
                            More
                          </SoftTypography>
                          <ArrowDropDownIcon />
                        </IconButton>
        
                        {activeMoreIndex === index && (
                          <Paper>
                            <MenuList>
                              <MenuItem>
                                <SoftTypography variant="body2" fontWeight="bold">
                                  Options
                                </SoftTypography>
                              </MenuItem>
                        
                              <ListItem onClick={handleCopyClick}>
                                  <ListItemText
                                    sx={{ paddingLeft: "25px" }} // Số px bạn muốn lùi vào trong
                                    >
                                    <Typography variant="body2" sx={{ fontSize: 17, display: "flex", alignItems: "center" }}>
                                      <EditIcon sx={{ marginRight: 1 }} />
                                      Edit
                                    </Typography>
                                  </ListItemText>
                              </ListItem>
                              
                              <ListItem>
                                  <ListItemText
                                    sx={{ paddingLeft: "25px" }} // Số px bạn muốn lùi vào trong
                                    >
                                    <Typography variant="body2" sx={{ fontSize: 17, display: "flex", alignItems: "center" }}>
                                      <DeleteIcon sx={{ marginRight: 1 }} />
                                      Delete
                                    </Typography>
                                  </ListItemText>
                              </ListItem>

                            </MenuList>
                          </Paper>
                        )}
                      </div>
                    ),
                  }))
                }
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
        <Footer />
      </SoftBox>
    </DashboardLayout>
  );
}

export default Course;
