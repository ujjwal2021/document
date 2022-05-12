const Job = require("../models/Job");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
}
const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort("createdAt");
    res.status(StatusCodes.OK).json({jobs, total: jobs.length});
    
}
const getOneJob = async (req,res) => {
    const {
        user: {userId},
        params: {id: jobId},
    } = req;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });
    if(!job){
        throw new NotFoundError(`no job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({job});
}


const updateJob = async (req, res) => {
    const {
        body: {company, position},
        user: {userId},
        params: {id: jobId},
    } = req;
    console.log({company, position});
    
    if(company === "" || position ===""){
        throw new BadRequestError("company or position fields cannot be empty");
    }
    const job = await Job.findOneAndUpdate(
            {_id: jobId, createdBy: userId},
            req.body,
            {new: true, runValidators: true}
        );
        if(!job){
            throw new NotFoundError(`no Job with id ${jobId}`);
        }
    res.status(StatusCodes.OK).json({job});
} 
const deleteJob = async (req, res)=> {
    const {
        user: {userId},
        params: {id: jobId},
    } = req;
    const job = await Job.findByIdAndRemove({_id: jobId, createdBy: userId});

    if(!job){
        throw new NotFoundError(`no Job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllJobs,
    createJob,
    getOneJob,
    updateJob,
    deleteJob
}