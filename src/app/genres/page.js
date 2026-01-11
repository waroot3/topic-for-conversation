"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Heart, Briefcase, Sticker, Lightbulb, Coffee, MapPin, Calendar, Star, BookOpen, Music
} from "lucide-react";

// Mapping new icons to genres
const genres = [
    { id: "bookmark", label: "価値観・人生観", Icon: Heart, color: "#d96c6c" },
    { id: "pen", label: "仕事・学び", Icon: Briefcase, color: "#4a5d51" },
    { id: "sticky", label: "雑学・小ネタ", Icon: Sticker, color: "#d4a768" }, // Or Lightbulb?
    { id: "lamp", label: "最近の関心ごと", Icon: Lightbulb, color: "#5c5c8a" },
    { id: "mug", label: "日常・暮らし", Icon: Coffee, color: "#8a5c5c" },
    { id: "map", label: "旅・場所", Icon: MapPin, color: "#5c8a70" },
    { id: "leaf", label: "季節・イベント", Icon: Calendar, color: "#d99e6c" },
    { id: "cover", label: "趣味・推し", Icon: Star, color: "#8a6c8a" },
    { id: "oldbook", label: "思い出", Icon: BookOpen, color: "#6c5c5c" },
    { id: "shelf", label: "映画/音楽/本", Icon: Music, color: "#5c6c8a" },
];

export default function GenrePage() {
    const router = useRouter();
    const [selected, setSelected] = useState([]);
    const [depth, setDepth] = useState("all");
    const [status, setStatus] = useState([]); // Empty implies "Both"

    const toggleGenre = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
        );
    };

    const toggleStatus = (id) => {
        setStatus((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const handleStart = () => {
        const params = new URLSearchParams();
        if (selected.length > 0) params.set("genres", selected.join(","));
        params.set("depth", depth);
        if (status.length > 0) params.set("status", status.join(","));

        // Page turning effect could happen here, but for now standard navigation
        router.push(`/topics?${params.toString()}`);
    };

    return (
        <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", paddingBottom: "100px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>どんな話をしましょうか？</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                {genres.map((g) => (
                    <button
                        key={g.id}
                        onClick={() => toggleGenre(g.id)}
                        style={{
                            background: selected.includes(g.id) ? g.color : "white",
                            color: selected.includes(g.id) ? "white" : "#666",
                            border: `2px solid ${g.color}`,
                            borderRadius: "16px",
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: selected.includes(g.id) ? `0 8px 16px ${g.color}40` : "0 4px 6px rgba(0,0,0,0.05)",
                            transform: selected.includes(g.id) ? "translateY(-4px)" : "none"
                        }}
                    >
                        <g.Icon size={48} strokeWidth={1.5} style={{ marginBottom: "1rem" }} />
                        <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{g.label}</span>
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: "2rem", background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>話題の深さ</label>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        {[{ id: 'all', l: '全て' }, { id: 'light', l: 'ライト' }, { id: 'normal', l: 'ふつう' }, { id: 'deep', l: 'ちょい深い' }].map(opt => (
                            <label key={opt.id} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <input
                                    type="radio"
                                    name="depth"
                                    checked={depth === opt.id}
                                    onChange={() => setDepth(opt.id)}
                                />
                                {opt.l}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>モード（複数選択可）</label>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {[{ id: 'normal', l: 'ノーマル' }, { id: 'special', l: 'スペシャル' }].map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => toggleStatus(opt.id)}
                                style={{
                                    cursor: "pointer",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "20px",
                                    background: status.includes(opt.id) ? "#5c2020" : "#eee",
                                    color: status.includes(opt.id) ? "white" : "#666",
                                    border: "none",
                                    fontWeight: "bold",
                                    transition: "all 0.2s"
                                }}
                            >
                                {opt.l}
                            </button>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                        ※未選択の場合は両方表示されます
                    </p>
                </div>
            </div>

            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <button className="button" style={{ fontSize: "1.2rem", padding: "1rem 3rem" }} onClick={handleStart}>
                    会話を始める
                </button>
                <button
                    onClick={() => router.push("/")}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#666",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "0.9rem"
                    }}
                >
                    トップページに戻る
                </button>
            </div>
        </main>
    );
}
