const ProjectTable = require("../database/ProjectTable");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../helpers/errorResponse");

exports.getProjects = asyncHandler(async (req, res, next) => {
  const result = await ProjectTable.get();

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


exports.createProject = asyncHandler(async (req, res, next) => {
  const result = await ProjectTable.create(req.body);
  if (!result) return next(new ErrorResponse("Could not make request", 409));

  return res.status(201).json({
    success: true,
    data: result,
  });
});

exports.updateProject = asyncHandler(async (req, res, next) => {
  const result = await ProjectTable.update(req.params.id, req.body);

  if (!result) return next(new ErrorResponse("Project not found", 404));

  return res.status(200).json({
    success: true,
    data: result,
  });
});

exports.getProjectById = asyncHandler(async (req, res, next) => {
  const result = await ProjectTable.getById(req.params.id);

  if (!result) return next(new ErrorResponse("Project not found", 404));

  return res.status(200).json({
    success: true,
    data: result,
  });
});

exports.removeProject = asyncHandler(async (req, res, next) => {
  const result = await ProjectTable.delete(req.params.id);

  if (!result) return next(new ErrorResponse("Project not found", 404));

  return res.status(200).json({
    success: true,
    data: result,
  });
});
