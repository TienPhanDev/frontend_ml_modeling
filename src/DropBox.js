import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
export default function DropBox(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ accept: ".tar.gz, targz" });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

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
            4) Once completed; you will be able to upload new images and see how
            accurate your model is at understanding real images! (e.g. 94%
            accuracy) <br />
          </p>
        </div>
          <div className="grid grid-cols-1 space-y-2">
            <div className="flex items-center justify-center w-full">
              <div className="container">
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop the file here or click to select file</p>
                </div>
              </div>
            </div>
            <label className="text-xs font-bold text-gray-400 tracking-wide">
              (Format must be *.tar.gz)
            </label>
            <button
              className="uppercase w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Begin modeling
            </button>
          </div>
        <aside>
          <h4>Accepted file</h4>
          <ul>{acceptedFileItems.length}</ul>
          <h4>Rejected file</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </div>
    </div>
  );
}
