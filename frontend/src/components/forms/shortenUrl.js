import { React, useState } from "react";
import Swal from "sweetalert2";

const ShortenURLForm = () => {
  let [info, setInfo] = useState({
    email: "",
    url: "",
  });
  let [response, setResponse] = useState({
    shortUrl: "",
    redirectUrl: "",
  });

//THIS CREATES POSTS THE URL TO SHORTEN TO THE DB AND RETURNS THE SHORTENED URL TO THE CLIENT.
  const postNewURL = async (e) => {
    e.preventDefault();

    //post route /shorturl/createshorturl
    let shortenNewURL = await fetch("/shorturl/createshorturl", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: info.email,
        url: info.url,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    setResponse({
      shortUrl: shortenNewURL.shortUrl,
      redirectUrl: shortenNewURL.redirectUrl,
    });
    return shortenNewURL;
  };

  //THIS POSTS THE EMAIL SUBMITTED IN THE SWEET ALERT FORM TO THE DB.
  const postEmail = async (email) => {
    await fetch("/shorturl/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  };

//THIS USES SWEETALERT AS A MODAL TO POST THE NEW EMAIL TO THE DB
  const openModal = () => {
    //eslint-disable-next-line no-unused-vars
    const { value: email } = Swal.fire({
      title: "Create your account",
      input: "email",
      inputLabel: "Enter your email below:",
      inputPlaceholder: "Your email here",
      showCancelButton: true,
      confirmButtonText: "Create account",
      confirmButtonColor: "#96be25",
      icon: "info",
      inputValidator: (value) => {
        postEmail(value);
        Swal.fire(
          "Email created!",
          "Your account has been succesfully created.",
          "success"
        );
      },
    });
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={postNewURL}
      className="xl:px-20 md:px-10 sm:px-6 px-4 md:py-12 py-9 2xl:mx-auto 2xl:container md:flex items-center justify-start"
    >
      <div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6">
        <div>
          <label className="text-sm font-medium leading-none text-gray-800">
            Email
          </label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-300 text-gray-500 py-3 w-full pl-3 mt-2"
            placeholder="e.g: john@gmail.com "
          />

          <p className="text-xs text-blue-300 py-3">
            Don't have an account? Sign up{" "}
            <span className="hover:underline" onClick={openModal}>
              here
            </span>
          </p>
        </div>
        <div className="mt-6 w-full">
          <label className="text-sm font-medium leading-none text-gray-800">
            URL to shorten:
          </label>
          <div className="relative flex items-center justify-center">
            <input
              name="url"
              type="url"
              required
              onChange={handleChange}
              className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
          </div>
        </div>
        <div className="mt-8">
          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 text-sm font-semibold leading-none text-white focus:outline-none bg-gray-900 border rounded hover:bg-gray-600 py-4 w-full">
            Create short-url
          </button>
        </div>
        <div className="text-xs text-gray-600 py-4">
          {response.redirectUrl ? (
            <div>
              {" "}
              URL succesfully stored as{" "}
              <span className="text-blue-300">{response.shortUrl}</span>. Click{" "}
              <a
                href={response.redirectUrl}
                className="text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>{" "}
              to be redirected to your original url.{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default ShortenURLForm;
