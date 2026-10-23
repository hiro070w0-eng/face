const express = require("express");
const { db } = require("../firebase");
const { parseUserRequest } = require("../gemini");

const router = express.Router();

// POST /job { text: "user message" }
router.post("/", async (req, res) => {
  try {
    const text = (req.body.text || "").trim();
    if (!text) return res.status(400).json({ error: "text is required" });

    const parsed = await parseUserRequest(text);

    const ticket = {
      goal: parsed.goal,
      params: parsed.params || {},
      missing: parsed.missing || [],
      status: (parsed.missing && parsed.missing.length) ? "needs_info" : "ready",
      createdAt: new Date().toISOString(),
      logs: []
    };

    const ref = await db.collection("tickets").add(ticket);
    res.json({ id: ref.id, ...ticket });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "face failed: " + e.message });
  }
});

// GET /tickets - for queue view
router.get("/", async (req, res) => {
  const snap = await db.collection("tickets").orderBy("createdAt", "desc").limit(20).get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});

module.exports = router;