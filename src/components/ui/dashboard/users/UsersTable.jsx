"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations, useLocale } from "next-intl";
import {
  fetchUsers,
  deleteUser,
  clearState,
  setFilters,
  clearFilters,
} from "@/store/users/users";
import {
  Edit,
  Trash2,
  Users,
  Mail,
  Shield,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  UserCheck,
  Crown,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Pagination from "./Pagination";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function UsersTable() {
  const dispatch = useDispatch();
  const locale = useLocale();
  const t = useTranslations("users");
  const { users, isLoading, error, message, pagination, filters } = useSelector(
    (state) => state.users
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
    userEmail: "",
  });

  const isRTL = locale === "ar";

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        duration: 4000,
        style: {
          background: "#1c283b",
          color: "#7a99c0",
          border: "1px solid #7a99c0",
        },
      });
      dispatch(clearState());
    }
    if (error) {
      toast.error(error, {
        duration: 4000,
        style: { background: "#EF4444", color: "white" },
      });
      dispatch(clearState());
    }
  }, [message, error, dispatch]);

  const handleDelete = async (userId, userEmail) => {
    setConfirmDialog({
      isOpen: true,
      userId: userId,
      userEmail: userEmail,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteUser(confirmDialog.userId)).unwrap();
      dispatch(fetchUsers({ page: currentPage, limit: 10, ...filters }));
      setConfirmDialog({ isOpen: false, userId: null, userEmail: "" });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleCloseDialog = () => {
    setConfirmDialog({ isOpen: false, userId: null, userEmail: "" });
  };

  const handleSearch = () => {
    const searchFilters = {
      search: searchTerm,
      role: roleFilter,
      page: 1,
      limit: 10,
    };
    setCurrentPage(1);
    dispatch(setFilters(searchFilters));
    dispatch(fetchUsers(searchFilters));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setCurrentPage(1);
    dispatch(clearFilters());
    dispatch(fetchUsers({ page: 1, limit: 10 }));
  };

  const handleRefresh = () => {
    dispatch(fetchUsers({ page: currentPage, limit: 10, ...filters }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchUsers({ page, limit: 10, ...filters }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case "user":
        return <UserCheck className="h-4 w-4 text-blue-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses =
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
    switch (role) {
      case "admin":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400`;
      case "user":
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400`;
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw
            className="h-8 w-8 animate-spin"
            style={{ color: "#7a99c0" }}
          />
          <p style={{ color: "#7a99c0" }}>{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header with Search and Filters */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${
                    isRTL ? "right-3" : "left-3"
                  }`}
                />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className={`w-full ${
                    isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                  } py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c283b] bg-white dark:bg-gray-800 transition-all duration-200`}
                  style={{ color: "#7a99c0" }}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                style={{ color: "#7a99c0" }}
              >
                <Filter className="h-4 w-4" />
                {t("filters")}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                style={{ backgroundColor: "#1c283b" }}
              >
                <Search className="h-4 w-4" />
                {t("search")}
              </button>

              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
                style={{ color: "#7a99c0" }}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                {t("refresh")}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#7a99c0" }}
                  >
                    {t("role")}
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c283b] bg-white dark:bg-gray-800"
                    style={{ color: "#7a99c0" }}
                  >
                    <option value="">{t("allRoles")}</option>
                    <option value="admin">{t("admin")}</option>
                    <option value="user">{t("user")}</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    {t("clearFilters")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "#1c283b20" }}
              >
                <Users className="h-12 w-12" style={{ color: "#7a99c0" }} />
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#7a99c0" }}
              >
                {t("noUsers")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                {t("noUsersDescription")}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className="border-b border-gray-200 dark:border-gray-700"
                    style={{
                      background: "linear-gradient(to right, #1c283b, #2d3748)",
                    }}
                  >
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      style={{ color: "#7a99c0" }}
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {t("email")}
                      </div>
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      style={{ color: "#7a99c0" }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {t("role")}
                      </div>
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      style={{ color: "#7a99c0" }}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {t("joinedAt")}
                      </div>
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      style={{ color: "#7a99c0" }}
                    >
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                            style={{ backgroundColor: "#1c283b" }}
                          >
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div
                              className="text-sm font-medium"
                              style={{ color: "#7a99c0" }}
                            >
                              {user.email}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ID: {user._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getRoleBadge(user.role)}>
                          {getRoleIcon(user.role)}
                          {t(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: "#7a99c0" }}>
                          {formatDate(user.createdAt)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t("updated")}: {formatDate(user.updatedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              (window.location.href = `/admin/users/edit/${user._id}`)
                            }
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 transform hover:scale-110"
                            title={t("edit")}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id, user.email)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:scale-110"
                            title={t("delete")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="تأكيد حذف المستخدم"
        message={`هل أنت متأكد من أنك تريد حذف المستخدم "${confirmDialog.userEmail}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        cancelText="إلغاء"
        type="danger"
      />
    </>
  );
}
