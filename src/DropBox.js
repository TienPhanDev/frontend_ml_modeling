import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function DropBox(props) {
  const [status, setStatus] = useState("");
  const [file, setFile] = useState({});
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({ accept: "image/*" });

  const handleSubmit = (e) => {
    const data = { "form-name": "contact", file };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data; boundary=random" },
      body: encode(data),
    })
      .then(() => setStatus("Form Submission Successful!!"))
      .catch((error) => setStatus("Form Submission Failed!"));

    e.preventDefault();
    setFile(file)
  };

  const encode = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
      formData.append(k, data[k]);
    });
    return formData;
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={`npm i react-dropzone${file.path}`}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div
      className="bg-hero-pattern relative min-h-screen flex items-center justify-center bg-gray-500 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="my-3 text-3xl font-bold text-gray-900">
            Machine Learning Modeling
          </h2>
          <h6 className="mb-2 text-gray-800">
            <em>How it works</em>
          </h6>
          <p className="text-left">
            1) Upload folders of images grouped by category (e.g. flowers can be
            roses, sunflowers, daffadils)
            <br />
            2) Click 'Begin Modeling' button below <br />
            3) Take a break and chill b/c the results can take up to 15 mins to
            process so don't close the browser! <br />
            4) Once completed; you will be able to upload new
            images and see how accurate your model is at understanding real images!
            (e.g. 94% accuracy) <br />
          </p>
        </div>
        <form
          className="mt-8 space-y-3"
          onSubmit={handleSubmit}
          action="/thank-you/"
          method="POST"
        >
          <div className="grid grid-cols-1 space-y-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-4">
                    <img
                      className="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                      alt="freepik"
                    />
                  </div>
                </div>

                <section className="container">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <aside>
                      {acceptedFileItems.length > 1 ? "Accepted files" : ""}
                      <ul>{acceptedFileItems}</ul>
                      {acceptedFileItems.length > 1 ? "Rejected files" : ""}
                      <ul>{fileRejectionItems}</ul>
                    </aside>
                  </div>
                </section>
              </label>
            </div><label className="text-xs font-bold text-gray-400 tracking-wide">
              (Image formats can be *.jpeg, *.jpg, *.png, *.svg)
            </label>
            <button
              className="uppercase w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              type="submit"
            >
              Begin modeling
            </button>
          </div>
          <div>
            <h3>{status}</h3>
          </div>
        </form>
        <aside>
          {acceptedFileItems.length > 1 ? "Accepted files" : ""}
          <ul>{acceptedFileItems}</ul>
          {acceptedFileItems.length > 1 ? "Rejected files" : ""}
          <ul>{fileRejectionItems}</ul>
        </aside>
      </div>
    </div>
  );
}

export default DropBox;
