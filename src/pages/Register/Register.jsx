import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../util/util.js";
import { useDispatch, useSelector } from "react-redux";
import FormComp from "../../components/Form/Form.jsx";
import { sign_up } from "../../redux/AuthSlice/AuthSlice.js";

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
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector(({ auth }) => auth);

  const initialValues = {
    email: "",
    password: "",
    name: "",
    rePassword: "",
  };

  const handleSubmit = async (values) => {
    const { payload } = await dispatch(sign_up(values));
    if (payload) {
      console.log(payload);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        {error["sign_up"] && (
          <p className="text-red-500 mt-5">{error["sign_up"]}</p>
        )}
        <FormComp
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          inputs={inputs}
          loading={loading["sign_up"]}
          titleBtn={"Sign Up"}
        />
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/signin"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
