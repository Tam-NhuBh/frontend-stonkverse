import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Card, Badge, Button, Pagination, Stack } from "@mui/material";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


function Post() {
  const [newNotifications, setNewNotifications] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // Số bài viết mỗi trang

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
      author: "John Doe",
      date: "2024-02-01",
      lastUpdated: "2024-02-01",
    },
    {
      id: 2,
      title: "First Post",
      content: "This is the content of the first post.",
      author: "John Doe",
      date: "2024-02-01",
      lastUpdated: "2024-02-01",
    },
    {
      id: 3,
      title: "First Post",
      content: "This is the content of the first post.",
      author: "John Doe",
      date: "2024-02-01",
      lastUpdated: "2024-02-01",
    },
    {
      id: 4,
      title: "First Post",
      content: "This is the content of the first post.",
      author: "John Doe",
      date: "2024-02-01",
      lastUpdated: "2024-02-01",
    },
  ]);

  
  useEffect(() => {
    // cập nhật số lượng bài viết mới và hiển thị "Recent posts"
    if (posts.length > 0) {
      setNewNotifications(posts.length);
    }
  }, [posts]);
  
    // Tính số trang
    const totalPages = Math.ceil(posts.length / postsPerPage);

  // Hàm xử lý sự kiện khi có bài viết mới
  const handleNewPost = () => {

  };

    // Lấy danh sách bài viết cho trang hiện tại
    const getCurrentPosts = () => {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      return posts.slice(indexOfFirstPost, indexOfLastPost);
    };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox my={3}>
            <Grid item xs={12} md={7}>
              <Card id="recent-post">
                  <SoftBox pt={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
                    <SoftTypography variant="h6" fontWeight="medium">
                        {newNotifications > 0 && ( // Kiểm tra nếu có bài viết mới
                        <Badge badgeContent={posts.length} color="error">
                          Recent posts
                         </Badge>
                      )}
                    </SoftTypography>
            
                    <Button
                      variant="contained"
                      onClick={handleNewPost}
                      sx={{ backgroundColor: '#02CBEC', color: 'white' }}
                      startIcon={<AddIcon style={{ color: 'white' }} />} 
                      
                      >
                      <span style={{ textTransform: 'none', color: 'white' }}> Create New Post</span>
                    </Button>
                
                  </SoftBox>
                  
                <Card id="post-container">
                  <SoftBox pt={1} pb={2} px={2}>
                    <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      {getCurrentPosts().map((post, index) => (
                        <li key={index} style={{ listStyleType: "none" }}>
                          {/* Hiển thị thông tin của bài viết */}
                          <SoftBox
                            component="div"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            bgcolor="grey.200"
                            borderRadius="lg"
                            p={3}
                            mb={2}
                            mt={2}
                          >
                            <SoftBox width="100%" display="flex" flexDirection="column">
                              <SoftTypography variant="button" fontWeight="medium" sx={{ marginBottom: '8px' }}>
                                {post.title}
                              </SoftTypography>
                              <SoftTypography variant="caption" color="text" sx={{ marginBottom: '4px' }}>
                                {post.content}
                              </SoftTypography>
                              <SoftTypography variant="caption" color="text" sx={{ marginBottom: '4px' }}>
                                Author: {post.author}
                              </SoftTypography>
                              <SoftTypography variant="caption" color="text" sx={{ marginBottom: '4px' }}>
                                Date: {post.date}
                              </SoftTypography>
                              <SoftTypography variant="caption" color="text" sx={{ marginBottom: '4px' }}>
                                Last Updated: {post.lastUpdated}
                              </SoftTypography>
                            </SoftBox>

                            <SoftBox
                                display="flex"
                                alignItems="center"
                                mt={{ xs: 2, sm: 0 }}
                                ml={{ xs: -1.5, sm: 0 }}
                                >
                                <SoftBox mr={1}>
                                  <SoftButton variant="text" color="error">
                                    <Icon>delete</Icon>&nbsp;delete
                                  </SoftButton>
                                </SoftBox>
                                <SoftButton variant="text" color="dark">
                                  <Icon>edit</Icon>&nbsp;edit
                                </SoftButton>
                              </SoftBox>
                          </SoftBox>
                        </li>
                      ))}
                    </SoftBox>
                  </SoftBox>
                  <SoftBox display="flex" justifyContent="center">
                    <Stack spacing={2} mb={3}>
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        size="large"
                        shape="rounded"
                          sx={{
                                "& .MuiPaginationItem-root.Mui-selected": {
                                  backgroundColor: '#02CBEC',
                                  color: '#FFFFFF', // Màu chữ
                                },
                                "& .MuiPaginationItem-root": {
                                  color: '#02CBEC', // Màu chữ cho các nút chưa được chọn
                                },
                              }}                   
                            />
                    </Stack>
                  </SoftBox>
                </Card>
              </Card>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Post;
