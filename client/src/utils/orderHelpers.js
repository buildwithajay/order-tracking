export const ORDER_STATUS_MAP = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'OutForDelivery',
    3: 'Delivered',
    4: 'Cancelled'
};

export const getStatusString = (status) => {
    if (status === null || status === undefined) return '';
    if (typeof status === 'number') {
        return ORDER_STATUS_MAP[status] || 'Unknown';
    }
    return status;
};

// Helper to normalize status for comparison (e.g. "OutForDelivery" -> "OutForDelivery")
export const normalizeStatus = (status) => {
    const s = getStatusString(status);
    return s.replace(/\s+/g, '');
};
