import { useState, useEffect } from 'react';
import { apiPrivate } from '../api/axios';
import { toast } from 'react-toastify';

export const useOrderUpdates = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(true); // Mock connection status

    const updateOrder = (orderId, updates) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, ...updates } : order
        ));
    };

    const addOrder = (order) => {
        setOrders(prev => [...prev, order]);
    };

    const removeOrder = (orderId) => {
        setOrders(prev => prev.filter(order => order.id !== orderId));
    };

    const confirmOrder = async (orderNumber) => {
        try {
            await apiPrivate.put(`/order/${orderNumber}/confirm`);
            toast.success('Order confirmed successfully!');
            return true;
        } catch (error) {
            toast.error('Failed to confirm order');
            return false;
        }
    };

    const acceptDelivery = async (orderNumber) => {
        try {
            await apiPrivate.put(`/order/${orderNumber}/accept`);
            toast.success('Order accepted for delivery!');
            return true;
        } catch (error) {
            toast.error('Failed to accept order');
            return false;
        }
    };

    const markAsDelivered = async (orderNumber) => {
        try {
            await apiPrivate.put(`/order/${orderNumber}/delivered`);
            toast.success('Order marked as delivered!');
            return true;
        } catch (error) {
            toast.error('Failed to mark as delivered');
            return false;
        }
    };

    const joinOrderGroup = (orderNumber) => {
        // Mock function for order tracking
        console.log(`Tracking order: ${orderNumber}`);
    };

    return {
        orders,
        setOrders,
        loading,
        setLoading,
        updateOrder,
        addOrder,
        removeOrder,
        confirmOrder,
        acceptDelivery,
        markAsDelivered,
        joinOrderGroup,
        isConnected
    };
};