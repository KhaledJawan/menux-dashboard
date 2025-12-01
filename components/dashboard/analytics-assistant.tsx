"use client";

import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { generateAIResponse } from "@/lib/ai/client";

type Message = { role: "user" | "assistant"; content: string };

const starterPrompts = [
  "Which items are ordered most this week?",
  "Are we busier at lunch or dinner?",
  "Where should we raise prices slightly?",
];

export function AnalyticsAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm your AI analyst. Ask me about revenue, rush hours, or best-sellers.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    const nextMessages = [...messages, { role: "user", content: prompt }];
    setMessages(nextMessages);
    setPrompt("");
    setIsLoading(true);
    const response = await generateAIResponse(prompt);
    setMessages([...nextMessages, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Order Insights
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ask natural questions about demand and flow.
          </p>
        </div>
        <Badge variant="muted" className="rounded-full">
          Beta
        </Badge>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {starterPrompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrompt(p)}
              className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-foreground transition hover:-translate-y-[1px]"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3 overflow-hidden rounded-xl border border-border bg-muted/50 p-3">
          <div className="flex-1 space-y-3 overflow-auto pr-2 text-sm">
            {messages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-white text-foreground shadow-sm"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-muted-foreground">Thinking…</div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              rows={2}
              placeholder="Ask about peak hours or most-ordered items…"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={isLoading}
            >
              Send
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
