import { getStatusString } from '../utils/orderHelpers';

const Badge = ({ status }) => {
    const statusStr = getStatusString(status);
    let colorClass = "bg-background text-text/80";

    switch (statusStr) {
        case 'Pending':
            colorClass = "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/30";
            break;
        case 'Confirmed':
            colorClass = "bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30";
            break;
        case 'Preparing': // Kept just in case, though removed from Enum
            colorClass = "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/30";
            break;
        case 'Out for Delivery':
        case 'OutForDelivery':
            colorClass = "bg-purple-100 text-purple-800 border-purple-200";
            break;
        case 'Delivered':
            colorClass = "bg-secondary/10 text-secondary border-secondary/20 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30";
            break;
        case 'Cancelled':
            colorClass = "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/30";
            break;
        default:
            colorClass = "bg-background text-text/70 border-border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
            {statusStr}
        </span>
    );
};

export default Badge;
