import React , { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Import the calendar icon


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// CSS styles for DatePicker
const datePickerStyles = {
  width: "100%", // Set the width to 100% to make it expand to fill its container
  borderRadius: "8px",
  
  boxSizing: "border-box" // Ensure padding and border are included in the total width/height
};

function AddPost() {
  const [image, setImage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageOptionsAnchor, setImageOptionsAnchor] = useState(null);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };


  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
    setAnchorEl(null); // Đóng menu sau khi đã chọn hình ảnh
  };

  const handleImageOptionsClick = (event) => {
    setImageOptionsAnchor(event.currentTarget);
  };

  const handleImageOptionClick = (selectedImage) => {
    setImage(selectedImage);
    setImageOptionsAnchor(null);
  };

  const handleAddImageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddImageClose = () => {
    setAnchorEl(null);
  };

  const handleGoBack = () => {
    // Điều hướng người dùng đến trang trước đó
    window.history.back();
  };

   return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Title</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                  
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <SoftTypography variant="body1" color="text" fontWeight="medium">Content</SoftTypography>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4} // Số hàng mở rộng
                          value={content}
                          onChange={handleContentChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                    {/* Các trường dữ liệu khác */}

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <SoftTypography variant="body1" color="text" fontWeight="medium">Image</SoftTypography>
                        </Grid>

                            <Grid item xs={4}>
                                  <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
                                  {/* Khung bao quanh với danh sách tùy chọn */}
                                  {imageOptionsAnchor && (
                                    <Menu
                                      id="image-options-menu"
                                      anchorEl={imageOptionsAnchor}
                                      keepMounted
                                      open={Boolean(imageOptionsAnchor)}
                                      onClose={() => setImageOptionsAnchor(null)}
                                    >
                                      <MenuItem onClick={() => handleImageOptionClick('Image 1')}>Image 1</MenuItem>
                                      <MenuItem onClick={() => handleImageOptionClick('Image 2')}>Image 2</MenuItem>
                                      <MenuItem onClick={() => handleImageOptionClick('Image 3')}>Image 3</MenuItem>
                                    </Menu>
                                  )}
                                  {/* Hiển thị hình ảnh được chọn */}
                                  {image && <img src={image} alt="Selected Image" />}
                                </div>
                              </Grid>

                              <Grid item xs={4}>
                                <div>
                                  <IconButton
                                    color="primary"
                                    aria-label="Add Image"
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleAddImageClick}
                                    style={{ color: '#02CBEC' }} // Thay đổi màu xanh lam cho nút Add Image

                                  >
                                    <AddIcon />
                                  </IconButton>
                                  <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleAddImageClose}
                                  >
                                    <input
                                      accept="image/*"
                                      id="raised-button-file"
                                      type="file"
                                      style={{ display: 'none' }}
                                      onChange={handleImageChange}
                                    />
                                    <label htmlFor="raised-button-file">
                                      <MenuItem component="span">Upload Image</MenuItem>
                                    </label>
                                  </Menu>
                                  <IconButton
                                    color="primary"
                                    aria-label="Image Options"
                                    aria-controls="image-options-menu"
                                    aria-haspopup="true"
                                    onClick={handleImageOptionsClick}
                                    style={{ color: '#02CBEC' }} // Thay đổi màu xanh lam cho nút Add Image

                                  >
                                    <ExpandMoreIcon />
                                  </IconButton>
                                </div>
                            </Grid>

                        </Grid>
                      </Grid>

               
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">
                        Date
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <SoftTypography>
                        <DatePicker
                          icon={CalendarTodayIcon}
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd/MM/yyyy" // Định dạng ngày tháng năm
                          placeholderText="Select date" // Placeholder cho input
                          showMonthDropdown // Hiển thị dropdown chọn tháng
                          showYearDropdown // Hiển thị dropdown chọn năm
                          dropdownMode="select" // Chế độ dropdown
                          isClearable // Cho phép xóa giá trị đã chọn
                          customInput={
                            <TextField
                              InputProps={{
                                startAdornment: (
                                  <CalendarTodayIcon style={{ marginRight: "8px" }} /> // Calendar icon
                                ),
                                sx: datePickerStyles
                              }}
                            />
                          }
                   
                        />
                        </SoftTypography>
                    </Grid>

                  </Grid>
                </Grid>

           
                
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" style={{ textTransform: 'none', color: 'white' }} onClick={handleGoBack}>Back</Button>
                  <Button variant="contained" color="primary" style={{ textTransform: 'none', color: 'white' }} sx={{ ml: 2 }}>Save</Button>
                </Grid>
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
        <Footer />
      </SoftBox>
    </DashboardLayout>
  );
}

export default AddPost;
