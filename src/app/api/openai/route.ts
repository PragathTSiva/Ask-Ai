// src/app/api/openai/route.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
try {
    // Parse the 'query' property from the request body
    const { query } = await request.json();

    const chat_completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: query }],
            model: "gpt-3.5-turbo",
    });

 return NextResponse.json({ response: chat_completion.choices[0].message.content });
} catch (error) {
    console.error('Error handling POST request:', error);
    // Handle errors and respond accordingly
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
}
