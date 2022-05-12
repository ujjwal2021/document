const express = require("express");
const router = express.Router();
const {getAllJobs, getOneJob, updateJob, deleteJob, createJob} = require("../controller/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getOneJob).patch(updateJob).delete(deleteJob);

module.exports = router;