const { GoogleGenerativeAI } = require("@google/generative-ai");
const facePrompt = require("./prompts/facePrompt");

const genAI = new GoogleGenerativeAI(process.env.FACE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function parseUserRequest(userText) {
  const result = await model.generateContent(`${facePrompt}\n\nUser request: ${userText}`);
  const text = result.response.text().trim()
    .replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
  return JSON.parse(text);
}

module.exports = { parseUserRequest };