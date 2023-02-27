require("dotenv").config;
const Collection = require("../models/collection");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL,
});

const getSoloCollection = async (req, res) => {
  const collectionId = req.params.col_id;
  // console.log(req.params.col_id);
  try {
    const result = await Collection.findOne({ where: { id: collectionId } });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createCollection = async (req, res) => {
  const { name, description, theme, authorId, extraFields } = req.body;
  const image = req?.file?.buffer;
  // console.log(image);
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

const editCollection = async (req, res) => {
  const { name, description, theme, authorId, extraFields, collectionId } =
    req.body;
  const image = req?.file?.buffer;
  console.log("image ", req?.file);
  console.log(req.body);

  let imageUrl;
  try {
    if (image && req.file.originalname !== "blob") {
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
      // res.send(imageUrl);
    }

    if (image && req.file.originalname === "blob") {
      await Collection.update(
        {
          name,
          description,
          theme,
          extraFields,
          authorId,
        },
        { where: { id: collectionId } }
      );
      return res.status(200).send("Collection updated, image preserved");
    }

    await Collection.update(
      {
        imageUrl: imageUrl || "../img/cltr_logo_100.png",
        name,
        description,
        theme,
        extraFields,
        authorId,
      },
      { where: { id: collectionId } }
    );
    res.send("Collection updated");
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteCollection = async (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;

  try {
    await Collection.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("Deleted collection");
  } catch (error) {
    res.status(404).send(error);
  }
};

const getTags = async (req, res) => {
  console.log(req);
  try {
    res.status(200).send("Tags");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createCollection,
  deleteCollection,
  editCollection,
  getSoloCollection,
  getTags,
};
