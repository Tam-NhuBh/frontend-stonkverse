import React , { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


function AddCourse() {
  const [image, setImage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageOptionsAnchor, setImageOptionsAnchor] = useState(null);

  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [discount, setDiscount] = React.useState("");
  const [description1, setDescription1] = React.useState("");
  const [description2, setDescription2] = React.useState("");
  const [code, setCode] = React.useState("");
  const [hashtag, setHashtag] = React.useState("");
  const [technology, setTechnology] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [rating, setRating] = React.useState(0);


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubtitleChange = (event) => {
    setSubtitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    // Lấy giá trị mới từ sự kiện nhập liệu
    const newPrice = event.target.value;
    // Kiểm tra nếu giá trị mới là số không âm, thì cập nhật state
    if (newPrice >= 0) {
      setPrice(newPrice);
    }
  };

  const handleDiscountChange = (event) => {
    // Lấy giá trị mới từ sự kiện nhập liệu
    const newDiscount = event.target.value;
    // Kiểm tra nếu giá trị mới là số không âm, thì cập nhật state
    if (newDiscount >= 0) {
      setDiscount(newDiscount);
    }
  };

  const handleDescription1Change = (event) => {
    setDescription1(event.target.value);
  };

  const handleDescription2Change = (event) => {
    setDescription2(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleHashtagChange = (event) => {
    setHashtag(event.target.value);
  };

  const handleTechnologyChange = (event) => {
    setTechnology(event.target.value);
  };

  const handleTagsChange = (event, value) => {
    setTags(value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
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

                {/* Các trường dữ liệu khác */}
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
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Subtitle</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        value={subtitle}
                        onChange={handleSubtitleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">
                        Price
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                            style={{
                              border: "none",
                              borderBottom: "1px solid #bdbdbd",
                              width: "100px",
                              textAlign: "center",
                              fontSize: "16px",
                              marginRight: "10px",
                            }}
                          />
                        
                        </div>
                      </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">
                        Discount
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="number"
                            value={discount}
                            onChange={handleDiscountChange}
                            style={{
                              border: "none",
                              borderBottom: "1px solid #bdbdbd",
                              width: "100px",
                              textAlign: "center",
                              fontSize: "16px",
                              marginRight: "10px",
                            }}
                          />
                        
                        </div>
                      </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Description 1</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4} // Số hàng mở rộng
                        value={description1}
                        onChange={handleDescription1Change}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Description 2</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4} // Số hàng mở rộng
                        value={description2}
                        onChange={handleDescription2Change}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Rating</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <Rating
                        value={rating}
                        onChange={handleRatingChange}
                      />
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

export default AddCourse;
