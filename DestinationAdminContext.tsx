import { createContext, useContext, useState, useEffect } from "react";
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TopDestinationEntry {
    id: string;
    city: string;
    country: string;
    continent: string;
    image: string | null;
    reservationCount: number;
    passengerCount: number;
    totalRevenue: number;
    confirmedCount: number;
}

interface DestinationAdminContextType {
    // CRUD
    updateDestination: (id: string, form: FormData) => Promise<void>;
    loadingUpdateDestination: boolean;
    addDestination: (formData: FormData) => Promise<void>;
    loadingAddDestination: boolean;
    deleteDestination: (id: string) => void;
    loadingDeleteDestination: boolean;

    // Top destinations stats
    topDestinations: TopDestinationEntry[];
    maxReservations: number;
    topDestinationsLoading: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const DestinationAdminContext = createContext<DestinationAdminContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const DestinationAdminProvider = ({ children }: { children: React.ReactNode }) => {

    const [loadingUpdateDestination, setLoadingUpdateDestination] = useState<boolean>(false);
    const [loadingAddDestination, setLoadingAddDestination] = useState<boolean>(false);
    const [loadingDeleteDestination, setLoadingDeleteDestination] = useState<boolean>(false);

    // Top destinations
    const [topDestinations, setTopDestinations] = useState<TopDestinationEntry[]>([]);
    const [maxReservations, setMaxReservations] = useState<number>(0);
    const [topDestinationsLoading, setTopDestinationsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { getDestinations } = useDestinationsContext();
    const { user } = useAuthContext();

    // ── CRUD ──────────────────────────────────────────────────────────────────

    const updateDestination = async (id: string, formData: FormData) => {
        setLoadingUpdateDestination(true);
        try {
            const res = await fetch(`http://localhost:5000/api/v1/destination/update/${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Error in updating destination");
            }

        } catch (err) {
            console.error("[updateDestination]", err);
        } finally {
            setLoadingUpdateDestination(false);
        }
    };

    const addDestination = async (formData: FormData) => {
        setLoadingAddDestination(true);
        try {
            const res = await fetch("http://localhost:5000/api/v1/destination/add", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Error in adding a destination");
            }

            await getDestinations();
            navigate("/admin/destinations");

        } catch (err) {
            console.error("[addDestination]", err);
        } finally {
            setLoadingAddDestination(false);
        }
    };

    const deleteDestination = async (id: string) => {
        setLoadingDeleteDestination(true);
        try {
            const res = await fetch(`http://localhost:5000/api/v1/destination/delete/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Error in deleting destination");
            }

            await getDestinations();

        } catch (err) {
            console.error("[deleteDestination]", err);
        } finally {
            setLoadingDeleteDestination(false);
        }
    };

    // ── Stats ─────────────────────────────────────────────────────────────────

    const getTopDestinations = async () => {
        setTopDestinationsLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/v1/reservations/top-destinations", {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Error in getting top destinations");
            }

            setTopDestinations(data.data.destinations);
            setMaxReservations(data.data.maxReservations);

        } catch (err) {
            console.error("[getTopDestinations]", err);
        } finally {
            setTopDestinationsLoading(false);
        }
    };

    // ── Effect ────────────────────────────────────────────────────────────────

    useEffect(() => {
        if (user?.role === "ADMIN") {
            getTopDestinations();
        }
    }, []);

    // ── Provider ──────────────────────────────────────────────────────────────

    return (
        <DestinationAdminContext.Provider
            value={{
                updateDestination,
                loadingUpdateDestination,
                addDestination,
                loadingAddDestination,
                deleteDestination,
                loadingDeleteDestination,
                topDestinations,
                maxReservations,
                topDestinationsLoading,
            }}
        >
            {children}
        </DestinationAdminContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useDestinationAdminContext = () => {

    const context = useContext(DestinationAdminContext);

    if (!context) {
        throw new Error("Please use the useDestinationAdminContext inside the DestinationAdminProvider");
    }

    return context;
};
