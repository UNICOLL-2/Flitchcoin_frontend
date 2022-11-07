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
    response = await axios.post("https://flitchcoin.com/api/Signup", userValue);
    console.log(response);
  } catch (error) {
    response = error.response;
  }
  return response;
};

// otp verify
const verifyEmail = async (data) => {
  let response;
  try {
    response = await axios.post("https://flitchcoin.com/api/verify_email", data);
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
    params.append("username", data.username);
    params.append("password", data.password);
    if(data.otp === ""){
      params.append("otp", 100000);
    }else{
      params.append("otp", Number(data.otp));
    }
    response = await axios.post("https://flitchcoin.com/api/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept" : "application/x-www-form-urlencoded",
      },
    });
    if (response.data) {
      console.log("first")
      localStorage.setItem("token", response.data.access_token);
    }
  } catch (error) {
    response = error.response;
  }
  if(response.status === 401) {
    alert("Wrong Username or Password");
  }
  return response.data;
};

// user login
const userLogin = async () => {
  let response;
  try {
    response = await axios.get("https://flitchcoin.com/api/users/me/items/", {
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
