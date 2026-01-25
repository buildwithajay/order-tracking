const Card = ({ children, title, className = "" }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 transition-colors ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
                    <h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
            )}
            <div className="px-6 py-6 text-gray-900 dark:text-gray-100">
                {children}
            </div>
        </div>
    );
};

export default Card;
