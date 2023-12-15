import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerValidationSchema } from "../../util/util.js";
// import { sign_up } from "../../redux/slices/authSlice/authActions.js";
import { useDispatch, useSelector } from "react-redux";
import FormComp from "../../components/Form/Form.jsx";
import { sign_up } from "../../redux/authSlice/authSlice.js";

const inputs = [
  {
    type: "text",
    placeholder: "User Name",
    id: "name",
  },
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
  {
    type: "password",
    placeholder: "Password",
    id: "rePassword",
  },
];

const Register = () => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const { loading } = useSelector(({ auth }) => auth);

  const initialValues = {
    email: "",
    password: "",
    name: "",
    rePassword: "",
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(sign_up(values));
    console.log(result);
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <FormComp
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          inputs={inputs}
          loading={loading["sign_up"]}
        />
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/signin"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
        {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      </div>
    </div>
  );
};

export default Register;
