export const name = "Saksham Chaudhary";

export const bio = "Software engineer"

export const resumeUrl = "https://drive.google.com/file/d/1RcoH6t66YixbY-SXO4TpiM_-EP-ZCiYp/view?usp=sharing";

export const notionUrl = "https://chemical-card-e29.notion.site/My-Work-1d239851fb19800cb12de90cf8362db2";

export type Project = {
    name: string;
    description: string;
    github: string;
    tags: string[];
    current?: boolean;
};

export const projects: Project[] = [
    {
        name: "Raft (written in Rust)",
        description: "An implementation of the Raft consensus algorithm in Rust — leader election, log replication, and fault-tolerant state machine replication, built from scratch to explore distributed consensus.",
        github: "https://github.com/Saksham1387/raft-rust",
        tags: ["Rust", "Distributed Systems", "Consensus"],
        current: true,
    },
     {
        name: "BizzyAgent",
        description: "A cloud coding agent for GitHub repositories — chat with an agent that works in an isolated Linux sandbox to inspect issues and PRs, change code, run tests, and open pull requests.",
        github: "https://github.com/Saksham1387/BizzyAgent",
        tags: ["Next.js", "Bun", "Turborepo", "AI Agents", "E2B"],
    },
    {
        name: "Exness",
        description: "Professional-grade CFD platform with real-time Binance price streaming, advanced charting, margin trading up to 100x, and integrated risk management and platform liquidation",
        github: "https://github.com/Saksham1387/Exness",
        tags: ["Bun", "React", "Redis", "PostgreSQL"],
    },
    {
        name: "Centralised Exchange (written in Rust)",
        description: "A centralized exchange written in Rust — order matching engine, API gateway, WebSocket server, and market maker with Redis-backed messaging.",
        github: "https://github.com/Saksham1387/Exchange-Rust",
        tags: ["Rust", "Redis", "Scalable WebSocket"],
    },
    {
        name: "Muxai",
        description: "A T3-stack unified AI chat platform that aggregates all major LLM providers into a single interface — supporting reasoning UI, smart profiles, and auto-conversations.",
        github: "https://github.com/Saksham1387/muxai",
        tags: ["Next.js", "tRPC", "Prisma", "AI SDK"],
    },
    {
        name: "Backpack Rust SDK",
        description: "A comprehensive Rust SDK for Backpack Exchange — providing type-safe REST & WebSocket APIs, order management, market data streaming, and account utilities. Published on crates.io.",
        github: "https://github.com/Saksham1387/backpack-rust-sdk",
        tags: ["Rust", "crates.io", "Trading API", "WebSocket"],
    },
]




