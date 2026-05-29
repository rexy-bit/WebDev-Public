import { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../Contexts/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MonthlyRevenueEntry {
    month: string;       // "2024-06"
    label: string;       // "Juin 24"
    revenue: number;
    confirmed: number;
    terminated: number;
    count: number;
}

export interface MonthlyRevenueSummary {
    totalRevenue: number;
    bestMonth: { label: string; revenue: number };
    currentMonth: { label: string; revenue: number; count: number };
    growthRate: number | null;
}

interface ReservationAdminStatsType {
    // Stats statuts
    confirmee: number;
    attente: number;
    annulee: number;
    terminee: number;
    nonPresent: number;
    remboursee: number;
    totalRevenue: number;

    // Revenu mensuel
    monthlyRevenue: MonthlyRevenueEntry[];
    monthlyRevenueSummary: MonthlyRevenueSummary | null;
    monthlyRevenueLoading: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ReservationAdminStatsContext = createContext<ReservationAdminStatsType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ReservationAdminStatsProvider = ({ children }: { children: React.ReactNode }) => {

    const { user } = useAuthContext();

    // Statuts
    const [confirmee, setConfirmee] = useState<number>(0);
    const [attente, setAttente] = useState<number>(0);
    const [annulee, setAnnulee] = useState<number>(0);
    const [terminee, setTerminee] = useState<number>(0);
    const [nonPresent, setNonPresent] = useState<number>(0);
    const [remboursee, setRemboursee] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);

    // Revenu mensuel
    const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenueEntry[]>([]);
    const [monthlyRevenueSummary, setMonthlyRevenueSummary] = useState<MonthlyRevenueSummary | null>(null);
    const [monthlyRevenueLoading, setMonthlyRevenueLoading] = useState<boolean>(false);

    // ── Fetchers ──────────────────────────────────────────────────────────────

    const getTotalRevenue = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/v1/reservations/revenu", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Error in getting total revenu");
            }

            setTotalRevenue(data.data);

        } catch (err) {
            console.error("[getTotalRevenue]", err);
        }
    };

    const getReservationStats = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/v1/reservations/stats", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Error in getting reservation stats");
            }

            setConfirmee(data.data.confirmee);
            setAnnulee(data.data.annulee);
            setAttente(data.data.attente);
            setNonPresent(data.data.nonPresent);
            setRemboursee(data.data.remboursee);
            setTerminee(data.data.terminee);

        } catch (err) {
            console.error("[getReservationStats]", err);
        }
    };

    const getMonthlyRevenue = async () => {
        try {
            setMonthlyRevenueLoading(true);

            const res = await fetch("http://localhost:5000/api/v1/reservations/revenu-mensuel", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Error in getting monthly revenue");
            }

            setMonthlyRevenue(data.data.months);
            setMonthlyRevenueSummary(data.data.summary);

        } catch (err) {
            console.error("[getMonthlyRevenue]", err);
        } finally {
            setMonthlyRevenueLoading(false);
        }
    };

    // ── Effect ────────────────────────────────────────────────────────────────

    useEffect(() => {
        if (user?.role === "ADMIN") {
            getReservationStats();
            getTotalRevenue();
            getMonthlyRevenue();
        }
    }, []);

    // ── Provider ──────────────────────────────────────────────────────────────

    return (
        <ReservationAdminStatsContext.Provider
            value={{
                confirmee,
                attente,
                annulee,
                terminee,
                nonPresent,
                remboursee,
                totalRevenue,
                monthlyRevenue,
                monthlyRevenueSummary,
                monthlyRevenueLoading,
            }}
        >
            {children}
        </ReservationAdminStatsContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useReservationAdminStatsContext = () => {

    const context = useContext(ReservationAdminStatsContext);

    if (!context) {
        throw new Error("Please use the useReservationAdminContext Hook inside a ReservationAdminStatsProvider");
    }

    return context;
};
