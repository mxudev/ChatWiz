const Response = require("../models/response.model");
const Thread = require("../models/thread.model");
const Vote = require("../models/vote.model");

const { getEmbedding, getChatResponse } = require("../services/openai.service");

const _generateResponse = async (parentThread, text) => {
    const response = new Response();
    response.parentThread = parentThread.id;
    response.votes = [];
    response.text = await getChatResponse(text);
    response.save();
    return response;
}

const threadLookupByQuestion = async (q) => {
    const existingThread = await Thread.findOne({ question: q });
    if (existingThread) {
        return existingThread;
    }
}

const getThreadById = async (id) => {
    const existingThread = await Thread.findOne({ _id: id });
    if (existingThread) {
        return existingThread;
    }
}

const getResponseById = async (id) => {
    const existingResp = await Response.findOne({ _id: id });
    if (existingResp) {
        return existingResp;
    }
}

const getUserVote = async (responseId, userId) => {
    const vote = await Vote.findOne({ author: userId, parentResponse: responseId });

    if(vote) {
        return vote.isUp ? 1 : -1;
    } else {
        return 0;
    }
}

const aggregateVotes = async (voteIds) => {
    voteValsPromises = voteIds.map(async (id) => {
        const vote = await Vote.findOne({ _id: id });
        return vote.isUp ? 1 : -1;
    });
    
    let voteVals = await Promise.all(voteValsPromises);
    let sum = 0;
    for(let i = 0; i < voteVals.length; i++) {
        sum += voteVals[i];
    }

    return sum;
}

module.exports = {
    _generateResponse,
    threadLookupByQuestion,
    getThreadById,
    getUserVote,
    aggregateVotes,
    getResponseById,
};
