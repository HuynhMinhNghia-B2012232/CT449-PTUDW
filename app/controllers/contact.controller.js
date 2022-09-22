const ContactService = require("./../services/contact.service");
const ApiError = require("./../api-error");
const MongoDB = require("./../utils/mongodb.util");

exports.create = async (req, res) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const documents = await contactService.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        documents,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findAll = async (req, res) => {
  let documents = [];

  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await contactService.findbyName(name);
    } else {
      documents = await contactService.find({});
    }
    res.status(201).json({
      status: "success",
      data: {
        documents,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        document,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new err();
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if (!document) throw new err();
    res.status(201).json({
      status: "success",
      message: "Contact was updated successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);
    if (!document) throw new err();
    res.status(201).json({
      status: "success",
      message: "Contact was deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAll = async (_req, res) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deletedCount = await contactService.deleteAll();
    res.status(201).json({
      status: "success",
      message: `${deletedCount} contacts were deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.findAllFavorite = async (req, res) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findFavorite();
    res.status(201).json({
      status: "success",
      document,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
