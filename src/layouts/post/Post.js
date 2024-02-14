import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Card, Badge, Button, Stack, Pagination} from "@mui/material";
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
  const [selectionModel, setSelectionModel] = useState([]); // Thêm state cho selectionModel

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
      title: "Second Post",
      content: "This is the content of the second post.",
      author: "Jane Smith",
      date: "2024-02-02",
      lastUpdated: "2024-02-02",
    },
    {
      id: 3,
      title: "Third Post",
      content: "This is the content of the third post.",
      author: "Alice Johnson",
      date: "2024-02-03",
      lastUpdated: "2024-02-03",
    },
    {
      id: 4,
      title: "Fourth Post",
      content: "This is the content of the fourth post.",
      author: "Bob Brown",
      date: "2024-02-04",
      lastUpdated: "2024-02-04",
    },
  ]);

  useEffect(() => {
    // cập nhật số lượng bài viết mới và hiển thị "Recent posts"
    if (posts.length > 0) {
      setNewNotifications(posts.length);
    }
  }, [posts]);

  const navigateToPostDetail = (postId) => {
    // Thực hiện logic chuyển hướng tại đây, ví dụ:
    window.location.href = `/postdetail/${postId}`;
  };

  // Tính số trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Hàm xử lý sự kiện khi có bài viết mới
  const handleNewPost = () => {
    // Xử lý khi có bài viết mới
    window.location.href = "/addpost";
  };

  // Lấy danh sách bài viết cho trang hiện tại
  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'content', headerName: 'Content', width: 400 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'lastUpdated', headerName: 'Last Updated', width: 200 },
  ];

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
                  <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                        rows={getCurrentPosts()}
                        columns={columns}
                        pageSize={postsPerPage}
                        page={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        pagination
                        hideFooterPagination // Ẩn "Rows per page"
                        checkboxSelection
                        selectionModel={selectionModel}
                        onSelectionModelChange={(newSelection) => {
                          setSelectionModel(newSelection);
                        }}
                      
                        onRowDoubleClick={(params) => {
                          const postId = params.row.id;
                          // Sử dụng helper function để chuyển hướng
                          navigateToPostDetail(postId);
                      }}
                    />              
                  </div>

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
