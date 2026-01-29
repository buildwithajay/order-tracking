const Card = ({ children, title, className = "" }) => {
    return (
        <div className={`bg-card dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl border border-border dark:border-gray-700 transition-colors ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-border dark:border-gray-700 bg-background/50 dark:bg-gray-900/20">
                    <h3 className="text-lg leading-6 font-semibold text-text dark:text-white">{title}</h3>
                </div>
            )}
            <div className="px-6 py-6 text-text dark:text-gray-100">
                {children}
            </div>
        </div>
    );
};

export default Card;
