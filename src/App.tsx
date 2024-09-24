import React, { useState } from "react";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.name === "" || formData.email === "") {
      alert("Please fill in all required fields.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(
        "https://2k5cz6ooi8.execute-api.us-east-1.amazonaws.com/Dev",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-center text-2xl font-bold text-green-600 sm:text-3xl mb-6">
              Thank You!
            </h1>
            <p className="text-center text-gray-700 mb-8">
              Your message is successfully sent and we will get back to you soon.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl mb-6">
            Contact us.
          </h1>
          <p className="text-center text-gray-500 mb-8">
            If you have any questions or comments, please fill out the form below.
            We'll get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Your message here..."
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={10}
                cols={ 50 }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;