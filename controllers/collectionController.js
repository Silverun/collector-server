require("dotenv").config;

const createCollection = (req, res) => {
  console.log(req.body);

  res.send("OK");

  // if (files) {
  //   const formData = new FormData();
  //   formData.append("image", files.file);
  //   try {
  //     const response = await axios.post(
  //       "https://api.imgbb.com/1/upload",
  //       formData,
  //       {
  //         params: {
  //           expiration: "600",
  //           key: "a0039a07ef71946ce2aae03fef02d685",
  //         },
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     console.log(response.data.data.url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};

module.exports = {
  createCollection,
};
