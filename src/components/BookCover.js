"use client";

import { useState } from "react";
import styles from "./BookCover.module.css";
import { PenIcon, MugIcon, LeafIcon } from "./GenreIcons";

export default function BookCover({ onOpen }) {
    const [step, setStep] = useState("closed"); // closed -> opening -> popup -> zooming

    const handleBookClick = (e) => {
        e.stopPropagation();
        if (step === "closed") {
            setStep("opening");
            // Delay popup slightly to match cover opening
            setTimeout(() => setStep("popup"), 800);
        }
    };

    const handleStartClick = (e) => {
        e.stopPropagation();
        setStep("zooming");
        setTimeout(() => {
            if (onOpen) onOpen();
        }, 1000);
    };

    return (
        <div className={`${styles.scene} ${styles[step] || ''} ${step !== 'closed' ? styles.opening : ''} ${step === 'zooming' ? styles.zooming : ''} ${step === 'popup' || step === 'zooming' ? styles.popup : ''}`} onClick={handleBookClick}>
            <div className={styles.book}>

                {/* === BACK COVER & PAGE BLOCK === */}
                <div className={styles.bookBody}>
                    <div className={styles.backCover}></div>

                    <div className={styles.pageBlock}>
                        <div className={styles.blockFaceRight}></div>
                        <div className={styles.blockFaceBottom}></div>
                        <div className={styles.blockFaceTop}></div>

                        {/* Top Page Surface */}
                        <div className={`${styles.page} ${styles.bodyPage}`}>
                            <div className={styles.popupContainer}>

                                {/* Only Main Interaction - Start Button */}
                                <div className={`${styles.popupItem} ${styles.mainPopup}`}>
                                    <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', letterSpacing: '1px' }}>WELCOME</p>
                                    <button className={styles.actionButton} onClick={handleStartClick}>
                                        会話を始める
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={styles.spine}></div>
                </div>

                {/* === FRONT COVER === */}
                <div className={styles.frontCoverGroup}>
                    <div className={`${styles.cover} ${styles.front}`}>
                        <h1 className={styles.title}>雑談のタネ</h1>
                        <span className={styles.tapHint}>Click to Open</span>
                    </div>
                    <div className={styles.frontInside}></div>
                </div>

            </div>
        </div>
    );
}
