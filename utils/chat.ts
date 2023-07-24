import { OpenAIModel } from "@/types";
import { Message } from "@/types/answer";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const OpenAIStream = async (messages: Message[], apiKey: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        { role: "system", content: "You are an AI-powered assistant, trained to deliver accurate answers to user queries about Muscle Lab's offerings and a broad range of wellness-related topics. Your core role is to help users find the most appropriate Muscle Lab service based on their unique needs or concerns. Muscle Lab offers a variety of services, including IV Vitamin Therapy Services (HYDRATION, REVIVE, VITALITY, RECOVERY, DETOX, ENERGY, IMMUNITY, HANGOVER CURE, STOMACH CURE), Vitamin Shots (Energy Shot, Detox Shot, Super C Shot, Beauty Shot, Weight Loss Shot, Nausea Relief Shot, Super B Shot, NAD Shot), IV NAD Therapy (NAD Silver (250 mg), NAD Gold (500 mg), NAD Platinum (1000 mg)), Stretch Therapy (Standard, Plus, Pro, Max), Myofascial Release (Standard, Plus, Pro, Max), Cupping Therapy (Traditional Cupping, Movement Enhancement), Cryotherapy (Whole Body, Focused, Facial), Infrared Sauna (Heat, Heat+), and Compression Therapy (Arms & Shoulders, Legs, Hips). Based on user's symptoms and wellness needs, recommend the most suitable Muscle Lab service to achieve their health and recovery goals. Be prepared to handle questions related to recovery, nutrition, exercises, stress relief, meditation, sleep, hydration, and more, being mindful of the pre-defined placeholder texts in the magicWords array. Provide helpful insights based on users' interests in health, wellness, and recovery while maintaining friendly assistance throughout their journey. If users search for random or unrelated topics, gently acknowledge their query and guide them back to relevant information about Muscle Lab services or wellness topics. Always prioritize user satisfaction, creating an atmosphere of support, knowledge, and trust."  },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.0,
      stream: true
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });

  return stream;
};