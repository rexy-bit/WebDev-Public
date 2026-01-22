// apiClient.ts
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
let isRedirecting = false;

// Fonction sécurisée de redirection
function redirectToProfile() {
  if (!isRedirecting) {
    isRedirecting = true;
    window.location.href = "/profile";
  }
}

// Fonction principale pour toutes les requêtes API
export const apiClient = async (
  url: string,
  options: RequestInit = {},
  isRetry = false
): Promise<Response> => {
  try {
    // ✅ Ne jamais retry la requête refresh elle-même
    if (url.includes("/auth/refresh-token")) {
      return fetch(url, { ...options, credentials: "include" });
    }

    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    // ✅ Tout va bien
    if (res.status !== 401 && res.status !== 403) {
      return res;
    }

    // ❌ Déjà un retry ? on stop
    if (isRetry) {
      console.warn("Auth failed after retry, redirecting to /profile");
      redirectToProfile();
      throw new Error("Unauthorized - already retried");
    }

    // 🔄 Si un refresh est déjà en cours, attendre
    if (isRefreshing && refreshPromise) {
      const success = await refreshPromise;
      if (success) {
        return apiClient(url, options, true);
      } else {
        redirectToProfile();
        throw new Error("Refresh failed");
      }
    }

    // 🆕 Début du refresh
    isRefreshing = true;
    refreshPromise = attemptRefresh();

    const success = await refreshPromise;

    isRefreshing = false;
    refreshPromise = null;

    if (success) {
      // ✅ Retry de la requête originale
      return apiClient(url, options, true);
    } else {
      redirectToProfile();
      throw new Error("Refresh token invalid, redirecting to profile");
    }
  } catch (err) {
    console.error("API error:", err);
    isRefreshing = false;
    refreshPromise = null;
    throw err;
  }
};

// Fonction pour refresh token
async function attemptRefresh(): Promise<boolean> {
  try {
    console.log("Attempting token refresh...");

    const refreshRes = await fetch(
      "http://localhost:5000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!refreshRes.ok) {
      console.error("Refresh failed:", refreshRes.status);
      return false;
    }

    console.log("Token refresh successful");
    return true;
  } catch (err) {
    console.error("Refresh attempt error:", err);
    return false;
  }
}

// Vérifier si l'utilisateur est connecté (helper)
export const checkAuth = async (): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/auth/check", {
      method: "GET",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
};
