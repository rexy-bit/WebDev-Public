import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import {
    useReservationAdminStatsContext,
    type MonthlyRevenueEntry,
} from "../../AdminContexts/ReservationAdminStatsContext";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtEur = (n: number) =>
    new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(n);

function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < breakpoint : false
    );
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [breakpoint]);
    return isMobile;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ width = "100%", height = 16, radius = 6 }: { width?: string | number; height?: number; radius?: number }) {
    return (
        <div
            style={{
                width,
                height,
                borderRadius: radius,
                background: "var(--color-background-secondary, #f0f0ee)",
                animation: "pulse 1.5s ease-in-out infinite",
            }}
        />
    );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
    icon: string;
    label: string;
    value: string;
    sub?: string;
    subColor?: string;
    subBg?: string;
    loading?: boolean;
}

function KpiCard({ icon, label, value, sub, subColor, subBg, loading }: KpiCardProps) {
    return (
        <div
            style={{
                background: "var(--color-background-secondary, #f5f5f3)",
                borderRadius: 8,
                padding: "14px 16px",
            }}
        >
            <p
                style={{
                    margin: "0 0 4px",
                    fontSize: 12,
                    color: "var(--color-text-secondary, #888)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <i className={`ti ${icon}`} aria-hidden="true" />
                {label}
            </p>
            {loading ? (
                <Skeleton height={28} width="70%" />
            ) : (
                <p style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
                    {value}
                </p>
            )}
            {sub && !loading && (
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 6,
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 8,
                        background: subBg ?? "var(--color-background-secondary, #eee)",
                        color: subColor ?? "var(--color-text-secondary, #888)",
                        fontWeight: 500,
                    }}
                >
                    {sub}
                </span>
            )}
        </div>
    );
}

// ─── Line Chart ───────────────────────────────────────────────────────────────

interface LineChartProps {
    months: MonthlyRevenueEntry[];
}

function LineChart({ months }: LineChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current || months.length === 0) return;
        if (chartRef.current) chartRef.current.destroy();

        const labels = months.map((m) => m.label);
        const revenues = months.map((m) => m.revenue);
        const confirmed = months.map((m) => m.confirmed);
        const terminated = months.map((m) => m.terminated);

        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Revenu total",
                        data: revenues,
                        borderColor: "#1D9E75",
                        backgroundColor: "rgba(29,158,117,0.08)",
                        borderWidth: 2.5,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: "#1D9E75",
                        tension: 0.4,
                        fill: true,
                    },
                    {
                        label: "Confirmées",
                        data: confirmed,
                        borderColor: "#378ADD",
                        backgroundColor: "transparent",
                        borderWidth: 1.5,
                        borderDash: [5, 4],
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        pointBackgroundColor: "#378ADD",
                        tension: 0.4,
                        fill: false,
                    },
                    {
                        label: "Terminées",
                        data: terminated,
                        borderColor: "#EF9F27",
                        backgroundColor: "transparent",
                        borderWidth: 1.5,
                        borderDash: [5, 4],
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        pointBackgroundColor: "#EF9F27",
                        tension: 0.4,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: "index",
                    intersect: false,
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: "#fff",
                        borderColor: "rgba(0,0,0,0.08)",
                        borderWidth: 1,
                        titleColor: "#111",
                        bodyColor: "#555",
                        padding: 12,
                        callbacks: {
                            label: (c) =>
                                `  ${c.dataset.label} : ${new Intl.NumberFormat("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                    maximumFractionDigits: 0,
                                }).format(c.parsed.y)}`,
                        },
                    },
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: "#888",
                            font: { size: 12 },
                            autoSkip: false,
                            maxRotation: 45,
                        },
                        border: { display: false },
                    },
                    y: {
                        grid: {
                            color: "rgba(0,0,0,0.05)",
                        },
                        ticks: {
                            color: "#888",
                            font: { size: 12 },
                            callback: (v) =>
                                new Intl.NumberFormat("fr-FR", {
                                    notation: "compact",
                                    compactDisplay: "short",
                                    style: "currency",
                                    currency: "EUR",
                                    maximumFractionDigits: 1,
                                }).format(v as number),
                        },
                        border: { display: false },
                    },
                },
            },
        });

        return () => { chartRef.current?.destroy(); };
    }, [months]);

    return (
        <div style={{ position: "relative", width: "100%", height: 280 }}>
            <canvas
                ref={canvasRef}
                role="img"
                aria-label="Line chart du revenu mensuel sur 12 mois"
            >
                Revenu mensuel sur 12 mois
            </canvas>
        </div>
    );
}

// ─── Skeleton Chart ───────────────────────────────────────────────────────────

function SkeletonChart() {
    return (
        <div style={{ width: "100%", height: 280, display: "flex", alignItems: "flex-end", gap: 6, padding: "0 8px" }}>
            {[55, 70, 45, 85, 60, 90, 40, 75, 65, 80, 50, 95].map((h, i) => (
                <div
                    key={i}
                    style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: "4px 4px 0 0",
                        background: "var(--color-background-secondary, #f0f0ee)",
                        animation: "pulse 1.5s ease-in-out infinite",
                        animationDelay: `${i * 0.05}s`,
                    }}
                />
            ))}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MonthlyRevenueChart() {
    const {
        monthlyRevenue,
        monthlyRevenueSummary: summary,
        monthlyRevenueLoading: loading,
    } = useReservationAdminStatsContext();

    const isMobile = useIsMobile();

    const growthPositive = summary?.growthRate !== null && (summary?.growthRate ?? 0) >= 0;

    const cardStyle: React.CSSProperties = {
        background: "var(--color-background-primary, #fff)",
        border: "0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.12))",
        borderRadius: 12,
        padding: isMobile ? 16 : 20,
    };

    return (
        <>
            {/* Animation keyframe — injectée une seule fois */}
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }`}</style>

            <div style={{ padding: "1rem 0" }}>

                {/* ── Header ── */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div>
                        <p style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "var(--color-text-primary, #111)" }}>
                            Revenu mensuel
                        </p>
                        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary, #888)" }}>
                            12 derniers mois — confirmées &amp; terminées
                        </p>
                    </div>
                </div>

                {/* ── KPI Cards ── */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "repeat(2, minmax(0,1fr))" : "repeat(4, minmax(0,1fr))",
                        gap: 12,
                        marginBottom: 16,
                    }}
                >
                    <KpiCard
                        icon="ti-currency-euro"
                        label="Total 12 mois"
                        value={fmtEur(summary?.totalRevenue ?? 0)}
                        loading={loading}
                        sub="cumulé"
                        subBg="var(--color-background-secondary)"
                        subColor="var(--color-text-secondary)"
                    />
                    <KpiCard
                        icon="ti-trending-up"
                        label="Meilleur mois"
                        value={fmtEur(summary?.bestMonth.revenue ?? 0)}
                        loading={loading}
                        sub={summary?.bestMonth.label}
                        subBg="#E1F5EE"
                        subColor="#0F6E56"
                    />
                    <KpiCard
                        icon="ti-calendar-stats"
                        label="Mois en cours"
                        value={fmtEur(summary?.currentMonth.revenue ?? 0)}
                        loading={loading}
                        sub={`${summary?.currentMonth.count ?? 0} réservations`}
                        subBg="#E6F1FB"
                        subColor="#185FA5"
                    />
                    <KpiCard
                        icon="ti-activity"
                        label="Évolution"
                        value={
                            summary?.growthRate !== null && summary?.growthRate !== undefined
                                ? `${summary.growthRate > 0 ? "+" : ""}${summary.growthRate}%`
                                : "—"
                        }
                        loading={loading}
                        sub="vs mois précédent"
                        subBg={growthPositive ? "#E1F5EE" : "#FCEBEB"}
                        subColor={growthPositive ? "#0F6E56" : "#A32D2D"}
                    />
                </div>

                {/* ── Chart Card ── */}
                <div style={cardStyle}>
                    {/* Légende manuelle */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 20px", marginBottom: 20 }}>
                        {[
                            { color: "#1D9E75", label: "Revenu total", dash: false },
                            { color: "#378ADD", label: "Confirmées",   dash: true  },
                            { color: "#EF9F27", label: "Terminées",    dash: true  },
                        ].map((item) => (
                            <span
                                key={item.label}
                                style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--color-text-secondary, #888)" }}
                            >
                                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                    <span style={{ width: item.dash ? 6 : 10, height: 2, background: item.color, borderRadius: 2 }} />
                                    {item.dash && <span style={{ width: 6, height: 2, background: item.color, borderRadius: 2 }} />}
                                </span>
                                {item.label}
                            </span>
                        ))}
                    </div>

                    {/* Chart ou skeleton */}
                    {loading ? <SkeletonChart /> : <LineChart months={monthlyRevenue} />}
                </div>
            </div>
        </>
    );
}
