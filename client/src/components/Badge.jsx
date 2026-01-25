import { getStatusString } from '../utils/orderHelpers';

const Badge = ({ status }) => {
    const statusStr = getStatusString(status);
    let colorClass = "bg-gray-100 text-gray-800";

    switch (statusStr) {
        case 'Pending':
            colorClass = "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/30";
            break;
        case 'Confirmed':
            colorClass = "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30";
            break;
        case 'Preparing': // Kept just in case, though removed from Enum
            colorClass = "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/30";
            break;
        case 'Out for Delivery':
        case 'OutForDelivery':
            colorClass = "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/30";
            break;
        case 'Delivered':
            colorClass = "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/30";
            break;
        case 'Cancelled':
            colorClass = "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/30";
            break;
        default:
            colorClass = "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
            {statusStr}
        </span>
    );
};

export default Badge;
