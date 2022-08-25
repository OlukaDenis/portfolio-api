const TagTable = require("../database/TagTable");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../helpers/errorResponse");

exports.getTags = asyncHandler(async (req, res, next) => {
  const result = await TagTable.get();

  if (!result) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    data: result,
  });
});


exports.createTag = asyncHandler(async (req, res, next) => {
  const result = await TagTable.create(req.body);
  if (!result) return next(new ErrorResponse("Could not make request", 409));

  return res.status(201).json({
    success: true,
    data: result,
  });
});

exports.updateTag = asyncHandler(async (req, res, next) => {
  const result = await TagTable.update(req.params.id, req.body);

  if (!result) return next(new ErrorResponse("Tag not found", 404));

  return res.status(200).json({
    success: true,
    data: result,
  });
});

exports.getTagById = asyncHandler(async (req, res, next) => {
  const result = await TagTable.getById(req.params.id);

  if (!result) return next(new ErrorResponse("Tag not found", 404));

  return res.status(200).json({
    success: true,
    data: result,
  });
});

exports.removeTag = asyncHandler(async (req, res, next) => {
  const result = await TagTable.delete(req.params.id);

  if (!result) return next(new ErrorResponse("Tag not found", 404));

  return res.status(200).json({
    success: true,
    data: result,
  });
});
