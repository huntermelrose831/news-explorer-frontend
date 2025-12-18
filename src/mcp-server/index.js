import express from "express";
import axios from "axios";

const PORT = process.env.MCP_PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const MODEL = process.env.OLLAMA_MODEL || "deepseek-coder";

const app = express();
app.use(express.json());

app.post("/v1/generate", async (req, res) => {
  try {
    const { prompt, ...opts } = req.body;

    // Ollama typically accepts POST /api/generate with { model, prompt, ... }
    const body = {
      model: MODEL,
      prompt,
      ...opts,
    };

    const ollamaResp = await axios.post(`${OLLAMA_HOST}/api/generate`, body, {
      timeout: 120000,
    });

    // Return the Ollama response body directly
    return res.json(ollamaResp.data);
  } catch (err) {
    console.error("MCP -> Ollama error", err?.response?.data || err.message);
    return res.status(500).json({ error: "Model request failed" });
  }
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(
    `MCP proxy listening on http://localhost:${PORT} -> ${OLLAMA_HOST} (model=${MODEL})`
  );
});
