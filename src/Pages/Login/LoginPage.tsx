import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "Context/Auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

type Props = {
    loginType?: LoginType;
};

type LoginFormsInputs = {
  email: string;
  password: string;
};

export enum LoginType {
  Login = "Login",
  Register = "Register",
}

const validation = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = ({loginType}: Props) => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentType, setCurrentType] = useState<LoginType>(loginType ?? LoginType.Login);
  const from = location.state?.from?.pathname || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  if (authContext == null) {
    toast.error("Auth context is null");
    return null;
  }
  if (authContext.isLoggedIn) {
    navigate("/search");
    return null;
  }

  const onSubmit = (data: LoginFormsInputs) => {
    if (currentType === LoginType.Login) {
      authContext.loginUser(data.email, data.password, from);
    } else {
      authContext.registerUser(data.email, data.password, from);
    }
  };

  return (
    <div className="d-flex align-items-start justify-content-center min-vh-100" style={{ backgroundColor: "#e3f2fd", paddingTop: "20vh" }}>
      <div className="card p-5" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <button className={`btn btn-link text-decoration-none fw-bold fs-3 ${currentType === LoginType.Login ? "text-primary" : "text-muted"}`} onClick={() => setCurrentType(LoginType.Login)}>Login</button>
          <span className="text-muted fs-3 pt-4 align-middle"> / </span>
          <button className={`btn btn-link text-decoration-none fw-bold fs-3 ${currentType === LoginType.Register ? "text-primary" : "text-muted"}`} onClick={() => setCurrentType(LoginType.Register)}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <label htmlFor="email" className="col-form-label col-sm-3 fw-bold">
              Email
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="password" className="col-form-label col-sm-3 fw-bold">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-50 mx-auto d-block">
            {currentType === LoginType.Login ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;