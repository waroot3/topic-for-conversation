"use client";

import styles from "./TopicCard.module.css";
import { useEffect, useState } from "react";

// Mappings for localization
const GENRE_MAP = {
    "bookmark": "価値観・人生観",
    "pen": "仕事・学び",
    "sticky": "雑学・小ネタ",
    "lamp": "最近の関心ごと",
    "mug": "日常・暮らし",
    "map": "旅・場所",
    "leaf": "季節・イベント",
    "cover": "趣味・推し",
    "oldbook": "思い出",
    "shelf": "映画/音楽/本"
};

const DEPTH_MAP = {
    "light": "ライト",
    "normal": "ふつう",
    "deep": "ちょい深い"
};

export default function TopicCard({ topic, animate, onAnimationEnd }) {
    const [animationClass, setAnimationClass] = useState("");

    useEffect(() => {
        if (animate) {
            setAnimationClass(styles.flipIn);
            const timer = setTimeout(() => {
                setAnimationClass("");
                if (onAnimationEnd) onAnimationEnd();
            }, 600); // Match CSS duration
            return () => clearTimeout(timer);
        }
    }, [animate, onAnimationEnd]);

    if (!topic) return null;

    // Get Japanese labels
    const genreLabel = GENRE_MAP[topic.genres[0]] || topic.genres[0];
    const depthLabel = DEPTH_MAP[topic.depth] || topic.depth;

    const isSpecial = topic.status === "special";

    // Helper for HTML parsing (for <br /> tags)
    const renderContent = (text) => {
        return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };

    return (
        <div className={`${styles.card} ${animationClass} ${isSpecial ? styles.specialCard : ''}`}>
            <div className={styles.content}>
                <div className={styles.questionSection}>
                    <h3 className={styles.question}>{renderContent(topic.question)}</h3>
                </div>
                <div className={styles.guideSection}>
                    <p className={styles.guideHeader}>{isSpecial ? "提供者" : "ヒント"}</p>
                    <p className={styles.guide}>
                        {isSpecial ? renderContent(topic.provider) : renderContent(topic.guide)}
                    </p>
                </div>
            </div>
            <div className={styles.footer}>
                <span className={styles.tag}>#{genreLabel}</span>
                <span className={styles.tag}>{depthLabel}</span>
                {isSpecial && <span className={styles.tag} style={{ background: '#gold', color: '#000' }}>★スペシャル</span>}
            </div>
        </div>
    );
}
