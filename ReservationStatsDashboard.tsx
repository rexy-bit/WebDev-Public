import { useEffect, useRef } from "react";
import { useReservationAdminStatsContext } from "../Contexts/ReservationAdminStatsContext";
import Chart from "chart.js/auto";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatusConfig {
  key: keyof Omit<ReturnType<typeof useReservationAdminStatsContext>, "totalRevenue">;
  label: string;
  color: string;
  bg: string;
  text: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: StatusConfig[] = [
  { key: "confirmee",  label: "Confirmée",    color: "#1D9E75", bg: "#E1F5EE", text: "#0F6E56" },
  { key: "terminee",   label: "Terminée",     color: "#378ADD", bg: "#E6F1FB", text: "#185FA5" },
  { key: "attente",    label: "En attente",   color: "#EF9F27", bg: "#FAEEDA", text: "#854F0B" },
  { key: "annulee",    label: "Annulée",      color: "#E24B4A", bg: "#FCEBEB", text: "#A32D2D" },
  { key: "remboursee", label: "Remboursée",   color: "#D85A30", bg: "#FAECE7", text: "#993C1D" },
  { key: "nonPresent", label: "Non présent",  color: "#888780", bg: "#F1EFE8", text: "#5F5E5A" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtEur = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

const fmtNum = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

const pct = (n: number, total: number) =>
  total ? `${Math.round((n / total) * 100)}%` : "0%";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface MetricCardProps {
  icon: string;
  label: string;
  value: string;
  badge?: { text: string; bg: string; color: string };
}

function MetricCard({ icon, label, value, badge }: MetricCardProps) {
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
      <p
        style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 500,
          color: "var(--color-text-primary, #111)",
        }}
      >
        {value}
      </p>
      {badge && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 6,
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 8,
            background: badge.bg,
            color: badge.color,
            fontWeight: 500,
          }}
        >
          {badge.text}
        </span>
      )}
    </div>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

interface DonutChartProps {
  data: number[];
  colors: string[];
  centerLabel: string;
  centerSublabel: string;
}

function DonutChart({ data, colors, centerLabel, centerSublabel }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: STATUS_CONFIG.map((s) => s.label),
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: "transparent",
          },
        ],
      },
      options: {
        responsive: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (c) => ` ${c.label} : ${c.raw}`,
            },
          },
        },
        animation: { duration: 600 },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, colors]);

  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <canvas
        ref={canvasRef}
        width={140}
        height={140}
        role="img"
        aria-label="Donut chart des statuts de réservation"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 500,
            color: "var(--color-text-primary, #111)",
          }}
        >
          {centerLabel}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: "var(--color-text-secondary, #888)",
          }}
        >
          {centerSublabel}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReservationStatsDashboard() {
  const stats = useReservationAdminStatsContext();

  const total = STATUS_CONFIG.reduce((sum, s) => sum + stats[s.key], 0);
  const successPct = pct(stats.confirmee + stats.terminee, total);
  const maxVal = Math.max(...STATUS_CONFIG.map((s) => stats[s.key]), 1);

  const cardStyle: React.CSSProperties = {
    background: "var(--color-background-primary, #fff)",
    border: "0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.12))",
    borderRadius: 12,
    padding: 20,
  };

  return (
    <div style={{ padding: "1rem 0" }}>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 500,
              color: "var(--color-text-primary, #111)",
            }}
          >
            Réservations
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--color-text-secondary, #888)",
            }}
          >
            Vue d'ensemble — toutes les réservations
          </p>
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <MetricCard
          icon="ti-currency-euro"
          label="Revenu total"
          value={fmtEur(stats.totalRevenue)}
          badge={{ text: "Confirmées", bg: "#EAF3DE", color: "#3B6D11" }}
        />
        <MetricCard
          icon="ti-calendar-check"
          label="Total réservations"
          value={fmtNum(total)}
          badge={{
            text: "tous statuts",
            bg: "var(--color-background-secondary, #f5f5f3)",
            color: "var(--color-text-secondary, #888)",
          }}
        />
        <MetricCard
          icon="ti-check"
          label="Confirmées"
          value={fmtNum(stats.confirmee)}
          badge={{ text: pct(stats.confirmee, total), bg: "#EAF3DE", color: "#3B6D11" }}
        />
        <MetricCard
          icon="ti-clock"
          label="En attente"
          value={fmtNum(stats.attente)}
          badge={{ text: pct(stats.attente, total), bg: "#FAEEDA", color: "#854F0B" }}
        />
      </div>

      {/* ── Charts row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
        }}
      >
        {/* Horizontal bar chart */}
        <div style={{ ...cardStyle, gridColumn: "span 2" }}>
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-text-secondary, #888)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Répartition par statut
          </p>

          {STATUS_CONFIG.map((s) => {
            const val = stats[s.key];
            const barWidth = Math.round((val / maxVal) * 100);
            return (
              <div
                key={s.key}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-primary, #111)",
                    width: 110,
                    flexShrink: 0,
                  }}
                >
                  {s.label}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    background: "var(--color-background-secondary, #f0f0ee)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${barWidth}%`,
                      background: s.color,
                      borderRadius: 4,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-secondary, #888)",
                    width: 28,
                    textAlign: "right",
                  }}
                >
                  {fmtNum(val)}
                </span>
              </div>
            );
          })}

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", marginTop: 16 }}>
            {STATUS_CONFIG.map((s) => (
              <span
                key={s.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "var(--color-text-secondary, #888)",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: s.color,
                    flexShrink: 0,
                  }}
                />
                {pct(stats[s.key], total)}
              </span>
            ))}
          </div>
        </div>

        {/* Donut + pills */}
        <div
          style={{
            ...cardStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-text-secondary, #888)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              alignSelf: "flex-start",
            }}
          >
            Taux de réussite
          </p>

          <DonutChart
            data={STATUS_CONFIG.map((s) => stats[s.key])}
            colors={STATUS_CONFIG.map((s) => s.color)}
            centerLabel={successPct}
            centerSublabel="succès"
          />

          <div style={{ marginTop: 16, width: "100%" }}>
            {[
              { key: "annulee",    label: "annulées",    bg: "#FCEBEB", color: "#A32D2D" },
              { key: "remboursee", label: "remboursées", bg: "#FAECE7", color: "#993C1D" },
              { key: "nonPresent", label: "absents",     bg: "#F1EFE8", color: "#5F5E5A" },
              { key: "terminee",   label: "terminées",   bg: "#E1F5EE", color: "#0F6E56" },
            ].reduce<React.ReactNode[]>((rows, item, i, arr) => {
              if (i % 2 === 0) {
                const next = arr[i + 1];
                rows.push(
                  <div
                    key={item.key}
                    style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}
                  >
                    {[item, next].filter(Boolean).map((it) => it && (
                      <span
                        key={it.key}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          fontSize: 12,
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontWeight: 500,
                          background: it.bg,
                          color: it.color,
                        }}
                      >
                        {fmtNum(stats[it.key as keyof typeof stats] as number)} {it.label}
                      </span>
                    ))}
                  </div>
                );
              }
              return rows;
            }, [])}
          </div>
        </div>
      </div>
    </div>
  );
}
