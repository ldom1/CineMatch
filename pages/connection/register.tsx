import React, { useState } from "react";
import Router from "next/router";
import { MainLayoutNotConnected } from "../../src/layouts/MainLayout";

export const verifMail = async (
  name: string,
  email: string,
  generated_code: string
) => {
  const generated_code_url = `${process.env.NEXT_PUBLIC_VERCEL_URL}/connection/validate_email/${generated_code}`;

  await fetch("/api/emailchecks/email_sender", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      verifyUrl: generated_code_url,
    }),
  });
};

export default function ConnectionScreen() {
  const [firstName, setFirstname] = useState("first name");
  const [lastName, setLastname] = useState("last name");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [passwordConfirmation, setPasswordConfirmation] = useState("password");
  const [errorFNTheme, setErrorFNTheme] = useState("bg-slate-200 border-none");
  const [errorLNTheme, setErrorLNTheme] = useState("bg-slate-200 border-none");
  const [errorETheme, setErrorETheme] = useState("bg-slate-200 border-none");
  const [errorPWTheme, setErrorPWTheme] = useState("bg-slate-200 border-none");
  const [showMessage, setShowMessage] = useState(false);

  const ValidationElement = () => {
    return (
      <>
        <div
          className={`flex w-full flex-col rounded-lg lg:w-1/5 ${
            showMessage ? "block" : "hidden"
          } bg-green-200 p-2 shadow-lg`}
        >
          <h3 className="font-extrabold text-green-800">Congratulations !</h3>
          <p className="font-light text-green-800">
            Welcome on board {firstName}
          </p>
        </div>
      </>
    );
  };

  const ValidationElementWithEmail = () => {
    return (
      <>
        <div
          className={`flex w-full flex-col rounded-lg lg:w-1/5 ${
            showMessage ? "block" : "hidden"
          } bg-green-200 p-2 shadow-lg`}
        >
          <h3 className="font-extrabold text-green-800">Congratulations !</h3>
          <p className="font-light text-green-800">
            Welcome on board {firstName}
          </p>
          <div className="flex flex-col">
            <p className="font-light text-green-800">
              A mail have been sent to <strong>{email}</strong>
            </p>
            <p className="font-light text-green-800">
              Please go check your mail to confirm your account
            </p>
          </div>
        </div>
      </>
    );
  };

  async function Register() {
    const CurrDate = new Date(Date.now()).toISOString();
    const verifyCode = `${lastName}${CurrDate}${firstName}`;

    if (firstName === "first name" || firstName === "") {
      setFirstname("");
      setErrorFNTheme("bg-red-300 border-2 border-red-500 text-white");
    }
    if (lastName === "last name" || lastName === "") {
      setLastname("");
      setErrorLNTheme("bg-red-300 border-2 border-red-500 text-white");
    }
    if (email === "email" || email === "") {
      setEmail("");
      setErrorETheme("bg-red-300 border-2 border-red-500 text-white");
    }
    if (firstName && lastName && email && password && passwordConfirmation) {
      if (email.includes("@")) {
        if (passwordConfirmation === password) {
          try {
            var headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              "Accept-Encoding": "gzip, deflate",
              Connection: "keep-alive",
            };
            let response = await fetch("/api/user_create", {
              method: "POST",
              headers: headers,
              body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                mailaddress: email,
                password: password,
                verifyEmailCode: verifyCode,
              }),
            });
            const resultInClear = await response.json();
            if (resultInClear.success) {
              setErrorFNTheme("bg-green-300 border-none");
              setErrorLNTheme("bg-green-300 border-none");
              setErrorETheme("bg-green-300 border-none");
              setErrorPWTheme("bg-green-300 border-none");
              setShowMessage(true);
              // verifMail(firstName, email, verifyCode);
              Router.push("/connection")
            } else {
              setErrorFNTheme("bg-red-300 border-2 border-red-500 text-white");
              setErrorLNTheme("bg-red-300 border-2 border-red-500 text-white");
              setErrorETheme("bg-red-300 border-2 border-red-500 text-white");
              setErrorPWTheme("bg-red-300 border-2 border-red-500 text-white");
            }
          } catch {
            alert("Database unhappy with your work");
          }
        } else if (passwordConfirmation != password) {
          setErrorPWTheme("bg-red-300 border-2 border-red-500 text-white");
        }
      } else {
        setErrorETheme("bg-red-300 border-2 border-red-500 text-white");
      }
    } else {
      alert("at least one field is missing");
    }
  }

  return (
    <MainLayoutNotConnected>
      <div>
        <h2 className="ml-10 text-xl font-light text-gray-100">Register</h2>
        <div
          className={`mt-8 grid w-full grid-cols-2 gap-2 rounded-lg border p-4 bg-gray-100`}
        >
          <h3 className="col-span-2 text-sky-600">Informations</h3>
          <input
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder={firstName}
            id="firstname"
            type="first_name"
            className={`rounded-md ${errorFNTheme} p-2 font-light text-slate-500 shadow-inner`}
          />
          <input
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            placeholder={lastName}
            id="lastname"
            className={`rounded-md ${errorLNTheme} p-2 font-light text-slate-500 shadow-inner`}
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={email}
            id="email"
            type="email"
            className={`col-span-2 rounded-md ${errorETheme} p-2 font-light text-slate-500 shadow-inner`}
          />
          <label className="col-span-2 border-none pt-2 text-sm text-slate-500">
            Password
          </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={password}
            type="password"
            id="password"
            className={`col-span-2 rounded-md ${errorPWTheme} p-2 font-light text-slate-500 shadow-inner`}
          />
          <label className="col-span-2 border-none pt-2 text-sm text-slate-500">
            Confirm
          </label>
          <input
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
            placeholder={passwordConfirmation}
            type="password"
            id="confirm"
            className={`col-span-2 rounded-md ${errorPWTheme} p-2 font-light text-slate-500 shadow-inner`}
          />
          <button
            onClick={Register}
            className="col-span-2 rounded-md border-none bg-sky-600 p-2 font-light text-slate-100 shadow-inner "
          >
            Register
          </button>
        </div>
      </div>
      <ValidationElement />
    </MainLayoutNotConnected>
  );
}
