// ═══════════════════════════════════════
// AI ENGINE — OpenRouter Integration
// Model: moonshotai/kimi-k2.6:free
// ═══════════════════════════════════════

const AIEngine = (() => {
  const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
  const MODEL = 'moonshotai/kimi-k2.6:free';
  const STORAGE_KEY = 'vesturo_openrouter_api_key';

  function getApiKey() {
    return localStorage.getItem(STORAGE_KEY) || '';
  }

  function setApiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
      return true;
    }
    return false;
  }

  function clearApiKey() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function hasApiKey() {
    return !!getApiKey();
  }

  // Generate AI-enhanced video prompt
  async function generateAIVideoPrompt(config, onChunk) {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error('No API key configured. Please add your OpenRouter API key in settings.');

    const masterPrompt = PromptEngine.generateMasterPrompt(config);

    const userMessage = `Based on the master system above, generate ONE complete, ultra-detailed video prompt for the following configuration:

SUBJECT: ${config.subject}
CATEGORY: ${config.category}
ABSTRACT SHAPE: ${config.abstractShape}
DEPLOYMENT STYLE: ${config.deployStyle}
DURATION: ${config.transformDuration} seconds
PARTS: ${config.numParts} segments
SPEED: ${config.speed}

Generate the COMPLETE video prompt that can be directly pasted into an AI video generation model (Google Veo 3, Kling, Runway). The prompt must:

1. Describe the FIRST FRAME in extreme detail (desk, abstract object, lighting, atmosphere)
2. Describe the hand interaction (0-3 seconds) with EXACT sound descriptions
3. Describe EVERY deployment stage with SPECIFIC mechanical movements and their EXACT sounds (pitch, volume, duration, decay)
4. Describe the LAST FRAME beauty shot
5. Include ALL anti-AI-artifact rules (no text, no morphing, consistent lighting, etc.)
6. Make the sounds VIVID and LOUD — the ASMR experience must be tangible
7. Ensure the subject's ORIGINAL REAL-WORLD COLORS are described (not generic metallic)
8. Make it work as a SINGLE continuous prompt — no sections, no headers, just one flowing detailed description

Output ONLY the raw video prompt text. No explanations, no commentary, no markdown formatting. Just the pure prompt ready to copy-paste.`;

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin || 'https://vesturo-asmr.app',
        'X-Title': 'Vesturo ASMR Prompt Generator',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: masterPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.8,
        max_tokens: 4096,
        stream: !!onChunk,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || errData.message || `API error ${response.status}`;
      throw new Error(errMsg);
    }

    // Streaming response
    if (onChunk && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (!trimmed.startsWith('data: ')) continue;

          try {
            const data = JSON.parse(trimmed.slice(6));
            const content = data.choices?.[0]?.delta?.content || '';
            if (content) {
              fullText += content;
              onChunk(content, fullText);
            }
          } catch (e) {
            // Skip malformed chunks
          }
        }
      }

      return fullText;
    }

    // Non-streaming response
    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response generated.';
  }

  // Generate AI-enhanced master prompt
  async function generateAIMasterPrompt(config, onChunk) {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error('No API key configured.');

    const baseMaster = PromptEngine.generateMasterPrompt(config);

    const userMessage = `You are an expert at creating prompts for AI video generation models. I have a base master prompt below for a self-deploying metallic toy ASMR video concept. 

Your task: ENHANCE and IMPROVE this master prompt to be even MORE detailed, MORE specific about sounds, MORE precise about mechanical movements, and MORE effective at preventing AI video generation artifacts.

Focus on:
1. Making sound descriptions more VIVID and SPECIFIC (exact pitches, volumes, decay times)
2. Making mechanical movement descriptions more PRECISE (exact angles, speeds, trajectories)
3. Strengthening anti-morphing and anti-artifact rules
4. Adding more specific details about the subject "${config.subject}" — its unique features translated to metal
5. Ensuring the original real-world colors of ${config.subject} are described with paint-chip-level accuracy

BASE MASTER PROMPT TO ENHANCE:
${baseMaster}

Output ONLY the enhanced master prompt. No commentary, no explanations. Just the improved prompt text.`;

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin || 'https://vesturo-asmr.app',
        'X-Title': 'Vesturo ASMR Prompt Generator',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert prompt engineer specializing in ultra-detailed AI video generation prompts for ASMR mechanical toy content. Your prompts must be exhaustively detailed, leaving ZERO ambiguity for the AI model. Every sound must be described with exact characteristics. Every movement must have precise physical parameters.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 8192,
        stream: !!onChunk,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API error ${response.status}`);
    }

    if (onChunk && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (!trimmed.startsWith('data: ')) continue;

          try {
            const data = JSON.parse(trimmed.slice(6));
            const content = data.choices?.[0]?.delta?.content || '';
            if (content) {
              fullText += content;
              onChunk(content, fullText);
            }
          } catch (e) { }
        }
      }
      return fullText;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response generated.';
  }

  // Test connection
  async function testConnection() {
    const apiKey = getApiKey();
    if (!apiKey) return { ok: false, error: 'No API key' };

    try {
      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin || 'https://vesturo-asmr.app',
          'X-Title': 'Vesturo ASMR Prompt Generator',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'user', content: 'Reply with just the word OK' }],
          max_tokens: 10,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return { ok: false, error: err.error?.message || `HTTP ${response.status}` };
      }

      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  return {
    getApiKey,
    setApiKey,
    clearApiKey,
    hasApiKey,
    generateAIVideoPrompt,
    generateAIMasterPrompt,
    testConnection,
    MODEL,
  };
})();
