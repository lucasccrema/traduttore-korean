// api/traduci.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ errore: "Metodo non consentito" });
  }

  const { testo } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` // API key protetta
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Sei un traduttore dal coreano all'italiano." },
          { role: "user", content: testo }
        ]
      })
    });

    const data = await response.json();
    const traduzione = data.choices[0].message.content;

    res.status(200).json({ traduzione });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errore: "Errore nella traduzione" });
  }
}
