import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Import the calendar icon
import CircularProgress from "@mui/material/CircularProgress"; // Thêm CircularProgress

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

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    title: "First Post",
    content: "This is the content of the first post.",
    author: "John Doe",
    date: new Date("2024-02-01"),
    lastUpdated: new Date("2024-02-01"),
  },
  {
    id: "2",
    title: "Second Post",
    content: "This is the content of the second post.",
    author: "Jane Smith",
    date: new Date("2024-02-02"),
    lastUpdated: new Date("2024-02-02"),
  },
  {
    id: "3",
    title: "Third Post",
    content: "This is the content of the third post.",
    author: "Alice Johnson",
    date: new Date("2024-02-03"),
    lastUpdated: new Date("2024-02-03"),
  }
];

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Find the post with postId
    const foundPost = mockPosts.find(item => item.id === postId);
    if (foundPost) {
      setPost(foundPost);
      setTitle(foundPost.title);
      setContent(foundPost.content);
      setSelectedDate(foundPost.date);
    }
  }, [postId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const getLastUpdatedText = (lastUpdated) => {
    const now = new Date();
    const diff = now - lastUpdated;
    const diffHours = diff / (1000 * 60 * 60);
    if (diffHours <= 24) {
      // Less than or equal to 24 hours
      return "Today";
    } else {
      // More than 24 hours
      return lastUpdated.toLocaleDateString();
    }
  };

  if (!post) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> {/* Thêm CircularProgress */}
      </div>
    
    );  
  }

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
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Author</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        fullWidth
                        value={post.author}
                        disabled // Disable editing
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
                        rows={4}
                        value={content}
                        onChange={handleContentChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Image</SoftTypography>
                    </Grid>
                    <Grid item xs={4}>
                      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
                        {image && <img src={image} alt="Selected Image" />}
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        <IconButton
                          color="primary"
                          aria-label="Add Image"
                          onClick={handleImageChange}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Date</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <SoftTypography>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select date"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          isClearable
                          customInput={
                            <TextField
                              InputProps={{
                                startAdornment: <CalendarTodayIcon style={{ marginRight: "8px" }} />
                              }}
                              sx={datePickerStyles}
                            />
                          }
                        />
                      </SoftTypography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <SoftTypography variant="body1" color="text" fontWeight="medium">Last Updated</SoftTypography>
                    </Grid>
                    <Grid item xs={9}>
                      <SoftTypography>{getLastUpdatedText(post.lastUpdated)}</SoftTypography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" style={{ textTransform: 'none', color: 'white' }} onClick={handleGoBack}>Back</Button>
                  <Button variant="contained" color="primary" style={{ textTransform: 'none', color: 'white' }} sx={{ ml: 2 }}>Update</Button>
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

export default PostDetail;
