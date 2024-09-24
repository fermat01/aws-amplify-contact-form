import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const formDataHandleFunc = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formOnSubmitFunc = () => {
    if (formData.name === "" || formData.email === "") {
      return alert("Please fill the form.");
    }

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: body,
    };

    // Replace fetch endpoint with your actual API gateway endpoint
    fetch(
      "AWS_API_GATEWAY_ENDPOINT",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => alert(JSON.parse(result).message))
      .catch((error) => alert(`error -  ${error}`));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-96">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati sunt dolores deleniti inventore quaerat mollitia?
            </p>
            <div className="mt-10">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Name"
                  name="name"
                  onChange={formDataHandleFunc}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg  p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  name="email"
                  onChange={formDataHandleFunc}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <div className="relative">
                <textarea
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Message"
                  name="message"
                  onChange={formDataHandleFunc}
                />
              </div>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white mt-6"
              onClick={() => formOnSubmitFunc()}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;