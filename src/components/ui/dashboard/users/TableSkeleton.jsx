"use client";

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="table-container overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-8 py-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-muted-foreground/20 rounded animate-pulse"></div>
                </div>
              </th>
              <th className="px-8 py-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                  <div className="w-12 h-4 bg-muted-foreground/20 rounded animate-pulse"></div>
                </div>
              </th>
              <th className="px-8 py-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-muted-foreground/20 rounded animate-pulse"></div>
                </div>
              </th>
              <th className="px-8 py-6 text-left">
                <div className="w-16 h-4 bg-muted-foreground/20 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full"></div>
                    <div className="space-y-2">
                      <div className="w-48 h-4 bg-muted rounded"></div>
                      <div className="w-24 h-3 bg-muted rounded"></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="w-20 h-6 bg-muted rounded-full"></div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-muted rounded"></div>
                    <div className="w-28 h-3 bg-muted rounded"></div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-xl"></div>
                    <div className="w-10 h-10 bg-muted rounded-xl"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
