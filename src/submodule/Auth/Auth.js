import React, {useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button/Button";
import Textfield from "../Components/Textfield/Textfield";
import "./Auth.scss";
import { useForm } from "react-hook-form";
import ErrorField from "../Components/ErrorField/ErrorField";
import { useNavigate } from "react-router-dom";
import Popup from "../Components/Popup/Popup";
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";
import { Auth as Guard } from "aws-amplify";
import Loading from "../Components/LoadingPage";

export default function Auth({ head, bg, formbg, bgImg, para, type,logo }) {
  const [confirm, setConfirm] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  Amplify.configure(awsconfig);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

 
  const search = window.location.search; //get the email from the url
  const params = new URLSearchParams(search);
  const verifyEmail = params.get(confirm ? "verify" : "email");
  const onSubmit = async (data) => {
    setLoading(true)
    let { firstName, lastName, email, password } = data;
    let response =
      type === 1 && !confirm
        ? await Guard.signUp({
            username: email,
            password,
            attributes: {
              name: firstName,
              family_name: lastName,
            },
          }).then(() => {
            setResponseStatus(true);
            setLoading(false)
            setResponseMessage(
              "Please Checkour Your Mail for Verification code"
            );
            reset();
            setConfirm(true);
            navigate(`/signup?verify=${email}`);
          })
        : confirm
        ? Guard.confirmSignUp(verifyEmail, data["Verification code"]).then(
            () => {
              setResponseStatus(true);
              setResponseMessage("Account Verified Successfully");
              setConfirm(false);
              setLoading(false)
              navigate("/signin");
            }
          )
        : type === 0
        ? Guard.signIn(email, password)
            .then((res) => {
            setLoading(false)
              setResponseStatus(true);
              setResponseMessage("Login successful");
              console.log(res)
              localStorage.setItem("token", res?.signInUserSession?.idToken.jwtToken);
              navigate("/");
            })
            .catch((err,message) => {
              console.log(err.message )
              setLoading(false)
              setResponseStatus(true);
              setResponseMessage(err.message);
            })
        : type === 2 && !forgot
        ? Guard.forgotPassword(email).then(() => {
            reset();
            setForgot(true);
            setLoading(false)
            navigate(`/forgot?email=${email}`);
          })
        : forgot
        ? Guard.forgotPasswordSubmit(
            verifyEmail,
            data["Verification code"],
            data["New password"]
          ).then(() => {
            reset();
            setLoading(false)
          })
        : null;
  };


  return (
    <>
      {loading ? (
        <div className="auth-loading-container">
          <Loading />
        </div>
      ) : (
        <div
          style={{
            backgroundColor: `${bg}`,
            backgroundImage: bgImg && `url(${bgImg})`,
          }}
          className="auth-container"
        >
          <div
            style={{ backgroundColor: `${formbg}` }}
            className={`auth-content ${type === 1 ? "signup" : null}`}
          >
            <img
              className={`${type === 1 ? "signup-logo" : null}`}
              src={logo}
              alt=""
            />
            <h1>{head}</h1>
            <p className={`${type === 1 ? "signup-title" : "login-title"}`}>
              {confirm ? (
                <p style={{ fontSize: "13px" }}>
                  Verification code is mailed to your registered mail
                </p>
              ) : (
                para
              )}
            </p>
            {responseStatus && (
              <Popup action={setResponseStatus} msg={responseMessage} />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              {type === 1 && !confirm && (
                <>
                  <Textfield type={type} reg={register} name="firstName" />
                  {errors.firstName ? (
                    <ErrorField error="Please enter first name" />
                  ) : null}
                  <Textfield type={type} reg={register} name="lastName" />
                  {errors.lastName ? (
                    <ErrorField error="Please enter Last name" />
                  ) : null}
                </>
              )}
              <Textfield
                type={type}
                reg={register}
                name={confirm || forgot ? "Verification code" : "email"}
              />

              {errors.email ? (
                <ErrorField error="Please enter your email address" />
              ) : errors["Verification code"] ? (
                <ErrorField error="Please enter Valid Code" />
              ) : null}
              {((type !== 2 && !confirm) || forgot) && (
                <>
                  <Textfield
                    type={type}
                    reg={register}
                    name={forgot ? "New password" : "password"}
                  />
                  {errors.password ? (
                    <ErrorField error="Please enter your  Password" />
                  ) : errors["New password"] ? (
                    <ErrorField error="Please enter your New Password" />
                  ) : null}
                </>
              )}

              {}
              <Link
                className={`${type === 1 ? "signup-link" : null}`}
                to={type === 1 ? "/" : "/forgot"}
              >
                {type === 1 && !confirm ? (
                  <p>Already have an Account ?</p>
                ) : type === 0 ? (
                  <p>forgot Your password ?</p>
                ) : //  : type === 2 ?(
                //   <p>Reset Link is sent to your registered mail</p> )
                null}
              </Link>

              {confirm ? (
                <span style={{ fontSize: "13px", cursor: "pointer" }}>
                  Resend Verification Code
                </span>
              ) : null}

              <Button
                type={
                  type === 1 && !confirm
                    ? "Signup"
                    : type === 2 && !forgot
                    ? "Forgot Password"
                    : confirm
                    ? "Verify Mail"
                    : forgot
                    ? "Reset Password"
                    : "Login"
                }
              />
              {type === 0 ? (
                <Link style={{ marginBottom: "0" }} to="/signup">
                  <p>Don't have an Account ?</p>
                </Link>
              ) : null}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
