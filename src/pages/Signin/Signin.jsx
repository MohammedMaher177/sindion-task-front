import React from "react";
// import { sign_in } from "../../redux/slices/authSlice/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import FormComp from "../../components/Form/Form.jsx";
import { signInValidationSchema } from "../../util/util.js";
import { Link } from "react-router-dom";
import { sign_in } from "../../redux/authSlice/authSlice.js";

const inputs = [
  {
    type: "email",
    placeholder: "Email",
    id: "email",
  },
  {
    type: "password",
    placeholder: "Password",
    id: "password",
  },
];

const Signin = () => {
  const { loading } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    console.log(values);
    const result = await dispatch(sign_in(values));
    console.log(result);
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <FormComp
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={signInValidationSchema}
          inputs={inputs}
          loading={loading["sign_in"]}
        />
        <div className="flex gap-2 mt-5">
          <p>Haven't an account?</p>
          <Link to={"/register"}>
            <span className="text-blue-700">Sign Up Now</span>
          </Link>
        </div>
        {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      </div>
    </div>
  );
};

export default Signin;
