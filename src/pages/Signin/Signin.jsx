import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormComp from "../../components/Form/Form.jsx";
import { signInValidationSchema } from "../../util/util.js";
import { Link, useNavigate } from "react-router-dom";
import { sign_in } from "../../redux/AuthSlice/AuthSlice.js";

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
  const { loading, error, token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    const { payload } = await dispatch(sign_in(values));
    if (payload) {
      console.log(payload);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        {error["sign_in"] && (
          <p className="text-red-500 mt-5">{error["sign_in"]}</p>
        )}
        <FormComp
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={signInValidationSchema}
          inputs={inputs}
          loading={loading["sign_in"]}
          titleBtn={"Sign In"}
        />
        <div className="flex gap-2 mt-5">
          <p>Haven't an account?</p>
          <Link to={"/register"}>
            <span className="text-blue-700">Sign Up Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
