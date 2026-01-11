"use client";

import { useRouter } from "next/navigation";
import MenuCard from "@/components/MenuCard";
import { Calendar, BookOpen, Medal } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/genres");
  };

  return (
    <main className="container" style={{
      /* Base: Matches Genre Page (Simple, Cream/Autumn theme) */
      backgroundColor: "var(--color-background)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflowY: "auto",
      padding: "20px"
    }}>

      {/* --- UI LAYER --- */}
      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        width: "100%",
        maxWidth: "1200px",
      }}>

        {/* 1. Left Card: Advent Calendar */}
        <div style={{ order: 1, flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
          <MenuCard
            title="アドベントカレンダー"
            description="2025年版の記事はこちら"
            buttonLabel="外部サイトを開く"
            href="https://adventar.org/calendars/11464"
            /* Tags removed per request */
            Icon={Calendar}
          />
        </div>

        {/* 2. Center Card: Conversation Seeds (Main) */}
        <div style={{ order: 2, flex: "1 1 320px", display: "flex", justifyContent: "center" }}>
          <MenuCard
            title="雑談のタネ"
            description="好きなジャンルでたくさん語ろう"
            buttonLabel="タネを探す"
            onClick={handleStart}
            isFeatured={true}
            Icon={BookOpen}
          />
        </div>

        {/* 3. Right Card: Tsundoku Salon Award (Disabled) */}
        <div style={{ order: 3, flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
          <MenuCard
            title="積読サロン大賞"
            description="現在停止中です"
            buttonLabel="停止中"
            disabled={true}
            /* Tags removed per request */
            Icon={Medal}
          />
        </div>

      </div>

    </main>
  );
}
