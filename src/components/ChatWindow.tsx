"use client";

import { useChat } from "@ai-sdk/react";
import { IconSend, IconX } from "@tabler/icons-react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const suggestedQuestions = [
	"What tech stack do you use?",
	"Tell me about your experience",
	"What projects are you proud of?",
	"How can I contact you?",
];

function TypingIndicator() {
	return (
		<div className="chat chat-start">
			<div className="chat-header">
				<span className="font-mono text-xs text-base-content/50">Luna</span>
			</div>
			<div className="chat-bubble bg-base-300">
				<div className="flex items-center gap-1 h-4">
					<span className="typing-dot" />
					<span className="typing-dot" />
					<span className="typing-dot" />
				</div>
			</div>
		</div>
	);
}

export default function ChatWindow() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({ api: "/api/chat" }),
	});

	const isBusy = status === "submitted" || status === "streaming";
	const showTypingIndicator =
		status === "submitted" ||
		(status === "streaming" &&
			messages.at(-1)?.role === "assistant" &&
			(messages.at(-1)?.parts.length ?? 0) === 0);

	// Auto-scroll to bottom on new content
	useEffect(() => {
		if (isOpen && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, status, isOpen]);

	// Focus input when panel opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Close on Escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				setIsOpen(false);
			}
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen]);

	const send = (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || isBusy) return;
		sendMessage({ text: trimmed });
		setInput("");
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		send(input);
	};

	return (
		<>
			{/* Floating Action Button - hidden when chat is open */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className={[
						"fixed bottom-6 right-6 z-40",
						"btn btn-primary btn-circle btn-xl shadow-lg shadow-primary/30",
						"transition-transform duration-200 hover:scale-110",
						"p-2 overflow-hidden",
					].join(" ")}
					aria-label="Open chat"
				>
					<Image
						src="/luna-robot-1.png"
						alt="Chat with Cody AI"
						width={56}
						height={56}
						className="w-full h-full object-cover"
					/>
				</button>
			)}

			{/* Chat Panel */}
			<div
				className={[
					"fixed z-35 transition-all duration-300 ease-out",
					isOpen
						? "opacity-100 translate-y-0 pointer-events-auto"
						: "opacity-0 translate-y-4 pointer-events-none",
					// Mobile: full screen, Desktop: card size anchored to bottom-right
					"inset-0 sm:inset-auto sm:bottom-6 sm:right-6",
					"sm:w-96 sm:h-128 sm:rounded-xl",
				].join(" ")}
			>
				<div className="card bg-base-200 shadow-xl shadow-primary/10 h-full flex flex-col sm:rounded-xl overflow-hidden border border-primary/20">
					{/* Title Bar */}
					<div className="px-4 py-3 bg-linear-to-r from-primary/10 to-secondary/10 flex items-center justify-between shrink-0">
						<div className="flex items-center gap-3">
							<span className="font-mono text-sm text-base-content/50 font-medium">
								Luna.ai
							</span>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="btn btn-ghost btn-sm btn-square -mr-2"
							aria-label="Close chat"
						>
							<IconX size={16} stroke={1.5} />
						</button>
					</div>

					{/* Message Area */}
					<div
						className="flex-1 overflow-y-auto p-4 space-y-4"
						role="log"
						aria-live="polite"
					>
						{/* Empty state with suggested questions */}
						{messages.length === 0 && !isBusy && (
							<div className="h-full flex flex-col justify-center">
								<div className="flex flex-col items-center gap-4 text-center mb-4">
									<div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-accent ring-offset-2 ring-offset-base-200">
										<Image
											src="/luna-laptop.webp"
											alt="Cody's dog Luna on a laptop"
											width={56}
											height={56}
											className="w-full h-full object-cover"
										/>
									</div>
									<p className="font-mono text-sm text-accent">
										Ask me anything about Cody
									</p>
								</div>
								<div className="flex flex-col gap-2 px-2">
									{suggestedQuestions.map((question) => (
										<button
											key={question}
											onClick={() => send(question)}
											className="btn btn-sm btn-base-content btn-soft hover:bg-primary hover:text-base-content font-mono text-xs normal-case"
										>
											{question}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Messages */}
						{messages.map((message) => {
							const text = message.parts
								.filter((p) => p.type === "text")
								.map((p) => (p as { text: string }).text)
								.join("");
							if (!text) return null;
							return message.role === "user" ? (
								<div key={message.id} className="chat chat-end">
									<div className="chat-header">
										<span className="font-mono text-xs text-primary">You</span>
									</div>
									<div className="chat-bubble chat-bubble-primary font-mono text-sm whitespace-pre-wrap">
										{text}
									</div>
								</div>
							) : (
								<div key={message.id} className="chat chat-start">
									<div className="chat-header">
										<span className="font-mono text-xs text-secondary">
											Luna
										</span>
									</div>
									<div className="chat-bubble chat-bubble-secondary font-mono text-sm whitespace-pre-wrap">
										{text}
									</div>
								</div>
							);
						})}

						{showTypingIndicator && <TypingIndicator />}

						<div ref={messagesEndRef} />
					</div>

					{/* Input Area */}
					<form
						onSubmit={onSubmit}
						className="border-t border-primary/20 p-3 bg-linear-to-r from-base-200 to-base-200/80 shrink-0"
					>
						<div className="join w-full">
							<input
								ref={inputRef}
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Type a message..."
								disabled={isBusy}
								className="input font-mono text-sm join-item flex-1 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-inset"
							/>
							<button
								type="submit"
								disabled={isBusy || !input.trim()}
								className="btn btn-accent join-item"
								aria-label="Send message"
							>
								<IconSend size={18} stroke={1.5} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
