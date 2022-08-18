import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";

function SignUp() {
  const { selectedType } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameParticipant: "",
    passwordParticipant: "",
    type: null,
    full_nameParticipant: "",
    usernamePool: "",
    passwordPool: "",
    full_namePool: ""
  });
  const { usernameParticipant, passwordParticipant, type, full_nameParticipant, usernamePool, passwordPool, full_namePool } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === 'participant') {
      if ((usernameParticipant == "") || (passwordParticipant == "") || (full_nameParticipant == "")) {
        alert("Please fill in the above information in PARTICIPANT");
      } else {
        var data = JSON.stringify({
          "username": usernameParticipant,
          "password": passwordParticipant,
          "full_name": full_nameParticipant,
          "is_pool":false
        })
        fetch("http://34.73.24.72/Signup", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: data
        }).then(res => res.json())
          .then((data) => {
            if (data) {
              dispatch(signinUser(formData));
              navigate("/sign_verify");
            }
          }).catch((err) => {
            console.log(err);
          })
      }
    } else if (type === 'pool') {
      if ((usernamePool == "") || (passwordPool == "") || (full_namePool == "")) {
        alert("Please fill in the above information in Pool");
      } else {
        var data = JSON.stringify({
          "username": usernamePool,
          "password": passwordPool,
          "full_name": full_namePool,
          "is_pool":true
        })
        fetch("http://34.73.24.72/Signup", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: data
        }).then(res => res.json())
          .then((data) => {
            if (data) {
              dispatch(signinUser(formData));
              navigate("/sign_verify");
            }
          }).catch((err) => {
            console.log(err);
          })
      }
    }
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
    <Animation/>
    <div className="back shadow">
      <div className="container">
        <div className="row login__two" >
          <div className="col col-sm-12 col-md-6 page_fill_3 pb-5">
            <form onSubmit={submitHandler}>
              <div className="card back">
                <div className="card-body">
                  <h5 className="card-title text-center">
                        I am a Borrower!
                      </h5>
                      <h5 className="card-title mt-5 mb-3">
                        Sign up as Participants
                      </h5>
                      <div className='input1 w-100'>
                  <input
                    type="email"
                    name="usernameParticipant"
                    value={usernameParticipant}
                    onChange={onChange}
                    placeholder="Enter your Email "
                    className="pressed txt-underline p-2 mb-3 mt-3 w-100"
                  />
                  <span class="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                  <input
                    type="password"
                    name="passwordParticipant"
                    value={passwordParticipant}
                    onChange={onChange}
                    placeholder="Enter your Password"
                    className="pressed txt-underline p-2 mb-2 w-100"
                  />
                  <span class="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                  <input
                    type="text"
                    name="full_nameParticipant"
                    value={full_nameParticipant}
                    onChange={onChange}
                    placeholder="Enter your Fullname"
                    className="pressed txt-underline p-2 mb-2 w-100"
                  />
                  <span class="underline"></span>
                  </div>
                  <input type="submit" className=" primary w-100 mt-4" value="Sign Up" name="Sign In" id="danger-outlined" autoComplete="off"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "participant",
                      })
                    }
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col col-sm-12 col-md-6 page_fill_3 pb-5">
            <form onSubmit={submitHandler}>
              <div className="card back">
                <div className="card-body">
                  <h5 className="card-title text-center">I am a lender!</h5>
                      <h5 className="card-title mt-5 mb-3">Sign up as Pool</h5>
                      <div className='input1 w-100'>
                  <input
                    type="email"
                    name="usernamePool"
                    value={usernamePool}
                    onChange={onChange}
                    placeholder="Enter your Email "
                    className="pressed txt-underline p-2 mb-3 mt-3 w-100"
                  />
                  <span class="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                  <input
                    type="password"
                    name="passwordPool"
                    value={passwordPool}
                    onChange={onChange}
                    placeholder="Enter your Password"
                    className="pressed txt-underline p-2 mb-2 w-100"
                  />
                  <span class="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                  <input
                    type="text"
                    name="full_namePool"
                    value={full_namePool}
                    onChange={onChange}
                    placeholder="Enter your Fullname"
                    className="pressed txt-underline p-2 mb-2 w-100"
                  />
                  <span class="underline"></span>
                  </div>
                  <input type="submit" className="primary w-100 mt-4" value="Sign Up" name="Sign In" id="danger-outlined" autoComplete="off"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "pool",
                      })
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignUp;
