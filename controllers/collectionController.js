require("dotenv").config;
const Collection = require("../models/collection");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_3oUgXC8q1MVP+De9xmkwQbWbdls=",
  privateKey: "private_QXtGmcrPc83s8pcHe2miEXCAQxo=",
  urlEndpoint: "https://ik.imagekit.io/tonykay",
});

const createCollection = async (req, res) => {
  const { name, description, theme, authorId, extraFields } = req.body;
  const image = req?.file.buffer;
  console.log(image);

  try {
    if (image) {
      const response = await imagekit.upload({
        file: image, //required
        fileName: req?.file.originalname, //required
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      });

      console.log(response.url);
    }

    // const result = await Collection.create({
    //   image,
    //   name,
    //   description,
    //   theme,
    //   extraFields,
    //   authorId,
    // });

    res.send("ok");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createCollection,
};
