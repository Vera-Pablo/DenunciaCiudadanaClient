import React, { useState, useRef, useEffect } from "react";
import type { Comment } from "../types";
import { useAddComment } from "../hooks/useAddComment";
import { MdSend } from "react-icons/md";

interface ReportChatProps {
    comments: Comment[];
    reportId: number;
    currentUserId: number;
}

export const ReportChat: React.FC<ReportChatProps> = ({
    comments: serverComments,
    reportId,
    currentUserId,
}) => {
    const [text, setText] = useState("");
    const [pending, setPending] = useState<Comment[]>([]);
    const mutation = useAddComment(reportId);
    const bottomRef = useRef<HTMLDivElement>(null);

    const allComments = [...pending, ...serverComments];

    useEffect(() => {
        if (pending.length > 0) {
            setPending([]);
        }
    }, [serverComments]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allComments.length]);

    const handleSend = () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const optimistic: Comment = {
            id_comment: -Date.now(),
            text: trimmed,
            date: new Date().toISOString(),
            id_user: currentUserId,
            user: {
                name: "",
                role: { type_role: currentUserId ? "Autoridad" : "Ciudadano" },
            },
        };

        setPending((prev) => [...prev, optimistic]);
        setText("");

        mutation.mutate(trimmed);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const isOwnMessage = (comment: Comment) => comment.id_user === currentUserId;
    const isPendingComment = (comment: Comment) => comment.id_comment < 0;

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 custom-scrollbar">
                {allComments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <span className="material-symbols-outlined text-3xl text-slate-300 mb-2">
                            chat_bubble_outline
                        </span>
                        <p className="text-slate-400 text-sm">
                            Aún no hay mensajes en esta conversación.
                        </p>
                    </div>
                ) : (
                    [...allComments].reverse().map((comment) => {
                        const own = isOwnMessage(comment);
                        const pending = isPendingComment(comment);
                        return (
                            <div
                                key={comment.id_comment}
                                className={`flex ${own ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${own
                                            ? `bg-primary text-on-primary rounded-br-md${pending ? " opacity-60" : ""}`
                                            : `bg-slate-100 text-slate-800 rounded-bl-md${pending ? " opacity-60" : ""}`
                                        }`}
                                >
                                    <p className={`text-[10px] font-semibold mb-1 ${own ? "text-on-primary/80" : "text-slate-500"}`}>
                                        {comment.user?.name || "Tú"} · {comment.user?.role?.type_role || "Ciudadano"}
                                    </p>
                                    <p className="whitespace-pre-wrap leading-relaxed">
                                        {comment.text}
                                    </p>
                                    <p className={`text-[10px] mt-1 text-right ${own ? "text-on-primary/60" : "text-slate-400"}`}>
                                        {new Date(comment.date).toLocaleString("es-AR", {
                                            day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            <div className="flex items-end gap-2 border-t border-slate-100 pt-3">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe un mensaje..."
                    rows={1}
                    className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-slate-400"
                />
                <button
                    onClick={handleSend}
                    disabled={!text.trim() || mutation.isPending}
                    className="p-2.5 bg-primary text-on-primary rounded-xl hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                    <MdSend size={18} />
                </button>
            </div>
        </div>
    );
};