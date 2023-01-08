import Layout from "./layouts";
import { useEffect } from "react";
import { defaultType,userLogin } from "./Feature/Auth/authSlice";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { selectedType } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(userLogin());
    dispatch(defaultType("accept"));
  }, []);

  return (
    <div>
      <Layout />
      {/* {selectedType === undefined && (
       
        )} */}
    </div>
  );
};

export default App;
