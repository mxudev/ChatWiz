const { _generateResponse, threadLookupByQuestion, getThreadById, getUserVote , aggregateVotes, getResponseById } = require("../services/work.service");
const { getEmbedding, getChatResponse } = require("../services/openai.service");
const Response = require("../models/response.model");
const Thread = require("../models/thread.model");
const Vote = require("../models/vote.model");

const search = async (req, res) => {
    const { search_text } = req.body;
    const embedding = await getEmbedding(search_text);

    const aggPipeline = [
        {
            $vectorSearch: {
                index: "threadQuestionIndex",
                path: "question_embedding",
                queryVector: embedding,
                numCandidates: 100,
                limit: 10
            }
        },
        {
            $project: { _id: 1, question: 1, responses: 1}
        }
    ]
    let result = await Thread.aggregate(aggPipeline);

    resultPromises = result.map(async (thread) => {
        const response = await getResponseById(thread.responses[0]);
        console.log("response" + response);
        return {
            _id: thread._id,
            question: thread.question,
            responsePreview: (response && response.text) || "nan",
        };
    });

    let resultList = await Promise.all(resultPromises);

    console.log("resultListt" + resultList);
    res.status(200).json({
        msg: "Success! nearby text found!",
        nearby: resultList,
    });

};

const generateThread = async (req, res) => {
    const { search_text } = req.body;

    const lookupThread = await threadLookupByQuestion(search_text);
    if (lookupThread != undefined) {
        res.status(200).json({
            msg: "Success! Thread already exist",
            thread: lookupThread,
        });
    }

    // thread doesn't already exist: create new thread
    const thread = new Thread();
    thread.question = search_text;
    thread.author = req.user.id;
    const response = await _generateResponse(thread, search_text);
    thread.responses = [response.id];
    await thread.save();
    res.status(200).json({
        msg: "Success! New thread created",
        thread: thread,
    });
};

const generateResponse = async (req, res) => {
    const { thread_id } = req.body;

    let parentThread = await getThreadById(thread_id);
    let newResp = await _generateResponse(parentThread, parentThread.question);

    parentThread.responses.push(newResp);
    await parentThread.save();
    res.status(200).json({
        msg: "Success! New response created",
        response: newResp,
    });
};

const getThread = async (req, res) => {
    try {
        const thread_id = req.params.id;
        let thread = await getThreadById(thread_id);

        if (!thread) {
            return res.status(404).json({ msg: "Thread not found" });
        }

        console.log("found thread: " + thread);

        let responsePromises = thread.responses.map(async (rId) => {
            const response = await getResponseById(rId);

            return {
                text: response.text,
                netUpvotes: await aggregateVotes(response.votes),
                userUpvoted: await getUserVote(response._id, req.user.id) === 1,
                userDownvoted: await getUserVote(response._id, req.user.id) === -1,
                id: response.id,
            };
        });

        let responseList = await Promise.all(responsePromises);
        responseList.sort((a, b) => b.netUpvotes - a.netUpvotes);
        
        res.status(200).json({
            msg: "Success!",
            question: thread.question,
            responseList: responseList,
        });
    } catch (error) {
        console.error("Error getting thread:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

const setVote = async (req, res) => {
    const { response_id, isUp } = req.body;

    const vote = await Vote.findOne({ parentResponse: response_id, author: req.user.id });

    if (vote) {
        vote.isUp = isUp;
        await vote.save();
        res.status(200).json({
            msg: "Success!"
        });
    } else {
        const newVote = new Vote();
        newVote.parentResponse = response_id;
        newVote.author = req.user.id;
        newVote.isUp = isUp;
        await newVote.save();

        const parentResponse = await Response.findOne({ _id: response_id });
        parentResponse.votes.push(newVote.id);
        await parentResponse.save();
        res.status(200).json({
            msg: "Success!"
        });
    }
};

module.exports = {
    search,
    generateThread,
    generateResponse,
    getThread,
    setVote,
};
