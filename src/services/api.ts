const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/socapas_back/api';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products.php`);
        if (!response.ok) throw new Error('Falha ao buscar produtos');
        const json = await response.json();
        return json.success ? json.data : [];
    } catch (error) {
        console.error("Erro na API:", error);
        return [];
    }
};

export const fetchVariations = async (productId: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/variations.php?product_id=${productId}`);
        if (!response.ok) throw new Error('Falha ao buscar variações');
        const json = await response.json();
        return json.success ? json.data : [];
    } catch (error) {
        console.error("Erro na API:", error);
        return [];
    }
};

export const createOrder = async (orderData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        return await response.json();
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return { success: false, error: 'Erro de conexão com o servidor' };
    }
};

export const fetchVideos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/videos.php`);
        if (!response.ok) throw new Error('Falha ao buscar vídeos');
        const json = await response.json();
        return json.success ? json.data : [];
    } catch (error) {
        console.error("Erro na API:", error);
        return [];
    }
};
