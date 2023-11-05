import instance from "../index";

export const login = async (username, password) => {
  try {
    const response = await instance.post("/authentication/login", {
      username,
      password,
    });

    return response.data; // Trả về dữ liệu từ API (hoặc thực hiện xử lý dữ liệu)
  } catch (error) {
    throw error; // Xử lý lỗi nếu có
  }
};

