import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    createElement,
  } from "react";

import { request } from "../../shared/lib/apiClient";

const ShopContext = createContext(null);

function ShopProvider({children}) {
    // start empty — never seed from localStorage to avoid showing stale data
    const [shops, setShops] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shopError, setShopError] = useState("");
    

    const fetchShops = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await request("/api/shops");
            if (data.success) {
                setShops(data.shops || []);
            } else {
                setError(data.message || "Failed to load shops");
                setShops([]);
            }
        } catch (err) {
            console.error("Error fetching shops:", err.message);
            setError(err.message || "Failed to load shops");
            setShops([]);
        } finally {
            setLoading(false);
        }
    };

    // fetch fresh from backend on every mount
    useEffect(() => {
        fetchShops();
    }, []);

    const createShop = async (shopInfo) => {
        try {
            const data = await request("/api/shops", {
                method: "POST",
                body: JSON.stringify(shopInfo),
            });
            if (data.success) {
                setShops((prev) => [...prev, data.shop]);
                return { success: true, shop: data.shop, message: data.message || "Shop created successfully" };
            }
            return { success: false, message: data.message || "Failed to create shop" };
        } catch (err) {
            console.error("Error creating shop:", err.message);
            return { success: false, message: err.message || "Failed to create shop" };
        }
    };

    const deleteShop = async (id) => {
        try {
            const data = await request(`/api/shops/${id}`, { method: "DELETE" });
            if (data.success) {
                setShops((prev) => prev.filter((s) => s._id !== id));
            } else {
                console.error("Error deleting shop:", data.message);
            }
        } catch (err) {
            console.error("Error deleting shop:", err);
        }
    };

    const fetchSingleShop = async (id) => {
        setShopError(null);
        try {
            const data = await request(`/api/shops/${id}`);
            if (data.success) {
                return { success: true, shop: data.shop };
            } else {
                setShopError(data.message || "Failed to load shop");
                return { success: false, message: data.message || "Failed to load shop" };
            }
        } catch (err) {
            console.error("Error fetching shop:", err.message);
            setShopError(err.message || "Failed to load shop");
        } 
    };


    const value = useMemo(() => ({
        shops,
        error,
        shopError,
        loading,
        fetchShops,
        createShop,
        deleteShop,
        fetchSingleShop
    }), [shops, error, shopError, loading]);

    return createElement(ShopContext.Provider, {value}, children);
}

function useShops() {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShops must be used within a ShopProvider");
    }
    return context;
}

export {ShopProvider, useShops};