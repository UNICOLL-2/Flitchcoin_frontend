import axios from "axios";

const defaultType = async (type) => {
  return type;
};

const loginUser = async (data) => {
  return data.type;
};

// signup user
const signupUser = async (data) => {
  let response;
  let userValue = {
    username: "",
    password: "",
    full_name: "",
    is_pool: null,
  };

  if (data.type === "participant") {
    userValue = {
      username: data.formData.username,
      password: data.formData.password,
      full_name: data.formData.fullName,
      is_pool: false,
    };
  } else {
    userValue = {
      username: data.formData.username,
      password: data.formData.password,
      full_name: data.formData.fullName,
      is_pool: true,
    };
  }
  try {
    response = await axios.post("http://34.73.24.72/Signup", userValue);
  } catch (error) {
    response = error.response;
  }
  return response;
};

// otp verify
const verifyEmail = async (data) => {
  let response;
  console.log(data);

  try {
    response = await axios.post("http://34.73.24.72/verify_email", data);
  } catch (error) {
    response = error.response;
  }

  return response.data;
};

// login user
const loginToken = async (data) => {
  let response;
  try {
    const params = new URLSearchParams();
    params.append("username", data.usernameParticipant);
    params.append("password", data.passwordParticipant);
    params.append("otp", Number(data.otp));
    response = await axios.post("http://34.73.24.72/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.data) {
      localStorage.setItem("token", response.data.access_token);
    }
  } catch (error) {
    response = error.response;
  }

  return response.data;
};

// user login
const userLogin = async () => {
  let response;
  try {
    response = await axios.get("http://34.73.24.72/users/me/items/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return {
      data: response.data,
      type: "participant",
    };
  } catch (error) {
    response = error.response;
    return response.data;
  }
};

const signinUser = async (data) => {
  return data.type;
};
const logOutUser = async () => {
  localStorage.removeItem("token");
};

const authService = {
  defaultType,
  loginUser,
  signinUser,
  logOutUser,
  loginToken,
  userLogin,
  signupUser,
  verifyEmail,
};

export default authService;
