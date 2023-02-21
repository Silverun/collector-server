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
  const image = req?.file?.buffer;
  console.log(image);
  let imageUrl;

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
      imageUrl = response.url;
      console.log(imageUrl);
    }

    const result = await Collection.create({
      imageUrl: imageUrl || "../img/cltr_logo_100.png",
      name,
      description,
      theme,
      extraFields,
      authorId,
    });

    res.status(200).send("Collection added");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  createCollection,
};
