"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import topicsData from "@/data/topics.json";
import TopicCard from "@/components/TopicCard";
import Link from "next/link";

function TopicDisplay() {
    const searchParams = useSearchParams();
    const [currentTopic, setCurrentTopic] = useState(null);
    const [history, setHistory] = useState([]);
    const [animate, setAnimate] = useState(false);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize and Filter
    useEffect(() => {
        const genres = searchParams.get("genres")?.split(",") || [];
        const depth = searchParams.get("depth") || "all";
        const status = searchParams.get("status") || "";

        let candidates = topicsData;

        // Filter by Genre (OR logic)
        if (genres.length > 0) {
            candidates = candidates.filter(t =>
                t.genres.some(g => genres.includes(g))
            );
        }

        // Filter by Status (Multi-select Logic)
        // If empty (not set) -> Show All (Normal + Special)
        // If both present -> Show All
        // If single present -> Strict match
        const statusFilters = status.split(",").filter(Boolean); // Clean splits

        if (statusFilters.length > 0) {
            candidates = candidates.filter(t => statusFilters.includes(t.status || "normal"));
        } else {
            // Not set implies "Both" -> Do nothing (Show all)
        }

        // Filter by Depth (Prefer strict, fallback if needed)
        // If depth is "all", we skip this filter
        if (depth !== "all") {
            const strict = candidates.filter(t => t.depth === depth);
            if (strict.length > 0) {
                candidates = strict;
            } else {
                // Fallback: If strict yields nothing? Keep all candidates?
                // Original logic kept candidates if strict < 3.
                // Let's stick to: if < 3, use all.
                // Actually, if user asked for "Deep" and there are none, showing nothing is correct?
                // But for MVP we want to show *something*.
                // Let's use the loose logic: try to filter, if result is low, ignore filter.
                if (strict.length >= 1) {
                    candidates = strict;
                }
            }
        }

        // If still no candidates? fallback to all data?
        if (candidates.length === 0) candidates = topicsData;

        // If strict still empty (e.g. weird genre combo), fallback to all
        // This line was problematic in the instruction's provided block due to `strict` scope.
        // The `candidates` variable should hold the final filtered list.
        // The previous `if (candidates.length === 0) candidates = topicsData;` handles the fallback.
        // So, we just need to set `filteredTopics` from `candidates`.

        setFilteredTopics(candidates);
        setLoading(false);
    }, [searchParams]);

    // Pick Next Topic
    const pickNext = useCallback(() => {
        if (filteredTopics.length === 0) return;

        // Exclude recent history (last 5)
        let available = filteredTopics.filter(t => !history.includes(t.id));

        // If all used, clear history (or just pick random from all)
        if (available.length === 0) {
            available = filteredTopics;
            setHistory([]);
        }

        const next = available[Math.floor(Math.random() * available.length)];

        setAnimate(true);
        // Slight delay to switch content mid-flip or immediate? 
        // Animation is "Page Flip In". So we should swap content immediately.
        setCurrentTopic(next);
        setHistory(prev => [...prev.slice(-9), next.id]); // Keep last 10
    }, [filteredTopics, history]);

    // Initial pick
    useEffect(() => {
        if (!currentTopic && filteredTopics.length > 0) {
            pickNext();
        }
    }, [filteredTopics, currentTopic, pickNext]);

    const saveTopic = () => {
        if (!currentTopic) return;
        const saved = JSON.parse(localStorage.getItem("savedTopics") || "[]");
        if (!saved.some(t => t.id === currentTopic.id)) {
            localStorage.setItem("savedTopics", JSON.stringify([...saved, currentTopic]));
            alert("保存しました！"); // Simple feedback
        } else {
            alert("すでに保存されています");
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container" style={{ justifyContent: "flex-start", paddingTop: "2rem" }}>
            <TopicCard
                topic={currentTopic}
                animate={animate}
                onAnimationEnd={() => setAnimate(false)}
            />

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button onClick={pickNext} className="button" style={{ minWidth: "120px" }}>
                    次のタネ
                </button>
                <button onClick={saveTopic} className="button" style={{ background: "#888", minWidth: "80px" }}>
                    保存
                </button>
                <button onClick={pickNext} className="button" style={{ background: "transparent", border: "1px solid #ccc", color: "#666", boxShadow: "none" }}>
                    スキップ
                </button>
            </div>

            <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <Link href="/genres" className="button" style={{
                    background: "transparent",
                    border: "2px solid #5c2020",
                    color: "#5c2020",
                    width: "100%",
                    maxWidth: "300px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: "1.2",
                    padding: "0.8rem"
                }}>
                    <span>会話を終わる</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: "normal" }}>（ジャンル選択へ）</span>
                </Link>

                <Link href="/saved" style={{ textDecoration: "underline", color: "#888", fontSize: "0.9rem" }}>
                    保存したタネを見る
                </Link>
            </div>
        </div>
    );
}

export default function TopicsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TopicDisplay />
        </Suspense>
    );
}
