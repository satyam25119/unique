import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

const SYSTEM_PROMPT =
  "You are the AI assistant for Unique Engineering, a crane and mechanical engineering company in India. Be helpful, concise, and knowledgeable about: crane erection/dismantling, gearboxes, VFDs, electrical work, AMC services, safety devices, hoist assembly, wire ropes. If asked about pricing, direct them to contact the team. Keep responses under 150 words. Use a friendly, professional tone.";

const MAX_MESSAGES = 20;

// In-memory conversation store: sessionId → messages array
const conversations = new Map<string, { role: string; content: string }[]>();

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, sessionId } = body as {
      message: string;
      sessionId?: string;
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }

    const sid = sessionId || crypto.randomUUID();

    // Get or create conversation history
    let history = conversations.get(sid) || [
      { role: "assistant", content: SYSTEM_PROMPT },
    ];

    // Add user message
    history.push({ role: "user", content: message.trim() });

    // Trim to last MAX_MESSAGES (keep system prompt as first message)
    if (history.length > MAX_MESSAGES) {
      history = [
        history[0],
        ...history.slice(-(MAX_MESSAGES - 1)),
      ];
    }

    const zai = await getZAI();

    const completion = await zai.chat.completions.create({
      messages: history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      thinking: { type: "disabled" },
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse || aiResponse.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: "I'm sorry, I couldn't generate a response. Please try again.",
      });
    }

    // Add AI response to history
    history.push({ role: "assistant", content: aiResponse });
    conversations.set(sid, history);

    return NextResponse.json({
      success: true,
      response: aiResponse,
      sessionId: sid,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
