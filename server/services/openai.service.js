const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

const getEmbedding = async (text) => {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text,
        }
        );
        // console.log(response);
        const embedding = response.data[0].embedding;
        // console.log(embedding);
        return embedding;
    } catch (err) {
        console.error(err);
    }
};

const getChatResponse = async (text) => {
    const params = {
        messages: [{ role: 'user', content: text }],
        model: 'gpt-3.5-turbo',
    };
    console.log("about to generate");
    const chatCompletion = await openai.chat.completions.create(params);
    console.log(chatCompletion.choices[0]);
    const textResponse = chatCompletion.choices[0].message.content;
    console.log("textResponse: " + textResponse);
    return textResponse;
};

module.exports = {
    getEmbedding,
    getChatResponse,
}
