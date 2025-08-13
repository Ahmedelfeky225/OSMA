"use client";

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="border-b-2 border-gray-200 dark:border-gray-700"
              style={{ background: "var(--admin-primary)" }}
            >
              <th className="px-8 py-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
                </div>
              </th>
              <th className="px-8 py-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
                  <div className="w-12 h-4 bg-white/20 rounded animate-pulse"></div>
                </div>
              </th>
              <th className="px-8 py-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-white/20 rounded animate-pulse"></div>
                </div>
              </th>
              <th className="px-8 py-6 text-left">
                <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-100 dark:divide-gray-700">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-28 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FormSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-[90%] max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="space-y-2">
              <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-64 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="admin-card p-8 animate-pulse">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-8">
            <div className="admin-card p-6 animate-pulse">
              <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-card p-6 animate-pulse">
              <div className="space-y-4">
                <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
    xl: "w-12 h-12 border-4",
  };

  const colorClasses = {
    primary: "border-blue-200 border-t-blue-600",
    white: "border-white/30 border-t-white",
    gray: "border-gray-200 border-t-gray-600",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
};

export const LoadingOverlay = ({ isVisible, message = "جاري التحميل..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="admin-card p-8 max-w-sm mx-4">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" color="primary" />
          <p className="admin-body text-lg font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export const ActionLoadingButton = ({
  isLoading,
  onClick,
  children,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "admin-btn-primary",
    secondary: "admin-btn-secondary",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner
            size="sm"
            color={
              variant === "primary" || variant === "danger"
                ? "white"
                : "primary"
            }
          />
          <span>جاري المعالجة...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export const ShimmerEffect = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer ${className}`}
    />
  );
};
