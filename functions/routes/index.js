/* eslint-disable new-cap */

const express = require("express");

const router = express.Router();

const {routeKeys} = require("../helpers");


const {
  getProjects,
  createProject,
  updateProject,
  removeProject,
} = require("../controllers/project.controller");

const {
  getTags,
  updateTag,
  createTag,
  removeTag,
} = require("../controllers/tag.controller");


router.route(`/${routeKeys.PROJECTS}`).get(getProjects);
router.route(`/${routeKeys.PROJECTS}`).post(createProject);
router.route(`/${routeKeys.PROJECTS}/:id`).patch(updateProject);
router.route(`/${routeKeys.PROJECTS}/:id`).delete(removeProject);

router.route(`/${routeKeys.TAGS}`).get(getTags);
router.route(`/${routeKeys.TAGS}`).post(createTag);
router.route(`/${routeKeys.TAGS}/:id`).patch(updateTag);
router.route(`/${routeKeys.TAGS}/:id`).delete(removeTag);


module.exports = router;
