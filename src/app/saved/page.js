"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopicCard from "@/components/TopicCard";

export default function SavedPage() {
    const [savedTopics, setSavedTopics] = useState([]);
    const [viewingTopic, setViewingTopic] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedTopics") || "[]");
        setSavedTopics(saved);
    }, []);

    const removeTopic = (id) => {
        const updated = savedTopics.filter(t => t.id !== id);
        setSavedTopics(updated);
        localStorage.setItem("savedTopics", JSON.stringify(updated));
        if (viewingTopic && viewingTopic.id === id) setViewingTopic(null);
    };

    if (viewingTopic) {
        return (
            <main className="container">
                <TopicCard topic={viewingTopic} />
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button onClick={() => setViewingTopic(null)} className="button" style={{ background: "#ccc" }}>一覧に戻る</button>
                    <button onClick={() => removeTopic(viewingTopic.id)} className="button" style={{ background: "#d96c6c" }}>削除</button>
                </div>
            </main>
        );
    }

    return (
        <main className="container" style={{ justifyContent: "flex-start", paddingTop: "2rem" }}>
            <h2 style={{ marginBottom: "2rem" }}>保存したタネ ({savedTopics.length})</h2>

            {savedTopics.length === 0 ? (
                <div style={{ textAlign: "center", color: "#666" }}>
                    <p>まだ保存された話題はありません。</p>
                    <div style={{ marginTop: "2rem" }}>
                        <Link href="/genres" className="button">話題を探す</Link>
                    </div>
                </div>
            ) : (
                <div style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {savedTopics.map(topic => (
                        <div key={topic.id} style={{
                            background: "white",
                            padding: "1.5rem",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setViewingTopic(topic)}>
                                <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{topic.question}</p>
                                <span style={{ fontSize: "0.8rem", color: "#888" }}>#{topic.genres[0]}</span>
                            </div>
                            <button onClick={() => removeTopic(topic.id)} style={{ border: "none", background: "none", color: "#999", padding: "0.5rem", cursor: "pointer" }}>✕</button>
                        </div>
                    ))}

                    <div style={{ marginTop: "2rem", textAlign: "center" }}>
                        <Link href="/genres" className="button">新しい話題を探す</Link>
                    </div>
                </div>
            )}
        </main>
    );
}
