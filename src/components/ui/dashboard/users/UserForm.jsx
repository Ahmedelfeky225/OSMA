"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  updateUser,
  createUser,
  clearState,
  fetchSingleUser,
} from "@/store/users/users";
import {
  User,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Shield,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  disabled,
  isRTL,
  className = "",
  children,
  error,
  success,
  ...props
}) => (
  <div className={className}>
    <label
      className={`block text-sm font-semibold mb-3 flex items-center gap-2 admin-subheading ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {label}
      {required && <span className="text-red-500">*</span>}
      {success && <CheckCircle2 className="h-4 w-4 text-green-500" />}
      {error && <AlertCircle className="h-4 w-4 text-red-500" />}
    </label>
    {children || (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 disabled:opacity-50 admin-body ${
          isRTL ? "text-right" : "text-left"
        } ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : success
            ? "border-green-300 focus:border-green-500 focus:ring-green-200"
            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200"
        }`}
        placeholder={placeholder}
        required={required}
        dir={isRTL ? "rtl" : "ltr"}
        {...props}
      />
    )}
    {error && (
      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4" />
        {error}
      </div>
    )}
    {success && (
      <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
        <CheckCircle2 className="h-4 w-4" />
        {success}
      </div>
    )}
  </div>
);

const PasswordStrengthIndicator = ({ password, isRTL }) => {
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const getStrengthText = () => {
    switch (strength) {
      case 0:
      case 1:
        return { text: "ضعيف جداً", color: "text-red-600", bg: "bg-red-200" };
      case 2:
        return { text: "ضعيف", color: "text-red-500", bg: "bg-red-200" };
      case 3:
        return { text: "متوسط", color: "text-yellow-600", bg: "bg-yellow-200" };
      case 4:
        return { text: "قوي", color: "text-green-600", bg: "bg-green-200" };
      case 5:
        return {
          text: "قوي جداً",
          color: "text-green-700",
          bg: "bg-green-300",
        };
      default:
        return { text: "", color: "", bg: "" };
    }
  };

  const strengthInfo = getStrengthText();

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.bg}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          ></div>
        </div>
        <span className={`text-sm font-medium ${strengthInfo.color}`}>
          {strengthInfo.text}
        </span>
      </div>
      <div className="text-xs text-gray-600 space-y-1">
        <div
          className={`flex items-center gap-2 ${
            password.length >= 8 ? "text-green-600" : "text-gray-400"
          }`}
        >
          {password.length >= 8 ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : (
            <AlertCircle className="h-3 w-3" />
          )}
          8 أحرف على الأقل
        </div>
        <div
          className={`flex items-center gap-2 ${
            /[A-Z]/.test(password) ? "text-green-600" : "text-gray-400"
          }`}
        >
          {/[A-Z]/.test(password) ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : (
            <AlertCircle className="h-3 w-3" />
          )}
          حرف كبير واحد على الأقل
        </div>
        <div
          className={`flex items-center gap-2 ${
            /[0-9]/.test(password) ? "text-green-600" : "text-gray-400"
          }`}
        >
          {/[0-9]/.test(password) ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : (
            <AlertCircle className="h-3 w-3" />
          )}
          رقم واحد على الأقل
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ completed, label, isRTL, warning = false }) => (
  <div
    className={`flex items-center gap-2 text-sm ${
      completed
        ? "text-green-600"
        : warning
        ? "text-yellow-600"
        : "text-gray-500"
    } ${isRTL ? "text-right" : "text-left"}`}
  >
    {completed ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : warning ? (
      <AlertTriangle className="h-4 w-4" />
    ) : (
      <AlertCircle className="h-4 w-4" />
    )}
    {label}
  </div>
);

export default function UserForm({ userId = null }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("users");
  const { isLoading, error, message, selectedUser } = useSelector(
    (state) => state.users
  );

  const [formData, setFormData] = useState({
    email: "",
    role: "user",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isRTL = locale === "ar";
  const isEditMode = userId !== null;

  useEffect(() => {
    dispatch(clearState());
    if (isEditMode && userId) {
      dispatch(fetchSingleUser(userId));
    }
  }, [dispatch, userId, isEditMode]);

  useEffect(() => {
    if (selectedUser && isEditMode) {
      setFormData({
        email: selectedUser.email || "",
        role: selectedUser.role || "user",
        // password: "", // Don't populate password for edit
      });
    }
  }, [selectedUser, isEditMode]);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        duration: 4000,
        style: {
          background: "var(--admin-primary)",
          color: "white",
          fontFamily: "var(--font-body)",
        },
      });
      dispatch(clearState());
      setTimeout(() => {
        router.push("/admin/users");
      }, 1000);
    }
    if (error) {
      toast.error(error, {
        duration: 4000,
        style: {
          background: "var(--admin-danger)",
          color: "white",
          fontFamily: "var(--font-body)",
        },
      });
      dispatch(clearState());
    }
  }, [message, error, dispatch, router]);

  const validateField = (name, value) => {
    const errors = {};

    switch (name) {
      case "email":
        if (!value.trim()) {
          errors.email = "البريد الإلكتروني مطلوب";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "صيغة البريد الإلكتروني غير صحيحة";
        }
        break;

      // case "password":
      //   if (!isEditMode) {
      //     if (!value.trim()) {
      //       errors.password = "كلمة المرور مطلوبة";
      //     } else if (value.length < 8) {
      //       errors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
      //     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      //       errors.password =
      //         "كلمة المرور يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام";
      //     }
      //   }
      //   break;

      case "role":
        if (!value) {
          errors.role = "الدور مطلوب";
        }
        break;
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (touched[name]) {
      const fieldErrors = validateField(name, value);
      setValidationErrors((prev) => ({
        ...prev,
        ...fieldErrors,
        [name]: fieldErrors[name] || null,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldErrors = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      ...fieldErrors,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const fieldErrors = validateField(key, formData[key]);
      Object.assign(errors, fieldErrors);
    });

    setValidationErrors(errors);
    setTouched({
      email: true,
      role: true,
      password: !isEditMode,
    });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("يرجى تصحيح الأخطاء في النموذج", {
        style: {
          background: "var(--admin-danger)",
          color: "white",
          fontFamily: "var(--font-body)",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        const updateData = { email: formData.email, role: formData.role };
        // إضافة كلمة المرور فقط إذا تم إدخالها
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }
        await dispatch(updateUser({ userId, userData: updateData })).unwrap();
      } else {
        const result = await dispatch(createUser(formData)).unwrap();
        console.log("User created successfully:", result);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error || "حدث خطأ أثناء العملية", {
        style: {
          background: "var(--admin-danger)",
          color: "white",
          fontFamily: "var(--font-body)",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const emailValid =
      formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const roleValid = formData.role;
    const passwordValid =
      isEditMode || (formData.password.trim() && formData.password.length >= 8);

    return (
      emailValid &&
      roleValid &&
      passwordValid &&
      Object.keys(validationErrors).length === 0
    );
  };

  if (isEditMode && isLoading && !selectedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-lg admin-body">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          {t("loadingUser")}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-[90%] max-w-[90%] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              disabled={isSubmitting}
              className=" sm:p-3 p-2 rounded-lg disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(to right, var(--primary-color), #3B82F6)",
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h1 className="admin-heading text-2xl sm:text-3xl tracking-wide flex items-center gap-3">
                <User className="h-8 w-8" />
                {isEditMode ? t("editUser") : t("createUser")}
              </h1>
              <p className="admin-body mt-2 text-sm tracking-wide opacity-70">
                {isEditMode
                  ? t("editUserDescription")
                  : t("createUserDescription")}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid w-full
           grid-cols-1 xl:grid-cols-3 gap-8"
        >
          <div className="xl:col-span-2 space-y-8">
            <div className="admin-card sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <User
                  className="h-5 w-5"
                  style={{ color: "var(--admin-primary)" }}
                />
                <h3 className="admin-subheading text-xl">
                  {t("userInformation")}
                </h3>
                <span className="text-red-500">*</span>
              </div>

              <div className="space-y-6">
                <FormField
                  label={
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t("email")}
                    </div>
                  }
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                  isRTL={isRTL}
                  placeholder={t("emailPlaceholder")}
                  error={touched.email && validationErrors.email}
                  success={
                    touched.email && formData.email && !validationErrors.email
                      ? "البريد الإلكتروني صحيح"
                      : null
                  }
                />

                {/* <FormField
                  label={
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      {isEditMode
                        ? "كلمة المرور الجديدة (اختياري)"
                        : t("password")}
                    </div>
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required={!isEditMode}
                  isRTL={isRTL}
                  placeholder={
                    isEditMode
                      ? "اتركها فارغة إذا لم تريد تغييرها"
                      : t("passwordPlaceholder")
                  }
                  error={touched.password && validationErrors.password}
                  type={showPassword ? "text" : "password"}
                >
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 disabled:opacity-50 admin-body ${
                        isRTL ? "text-right" : "text-left"
                      } ${
                        touched.password && validationErrors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200"
                      }`}
                      placeholder={
                        isEditMode
                          ? "اتركها فارغة إذا لم تريد تغييرها"
                          : t("passwordPlaceholder")
                      }
                      required={!isEditMode}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 transform -translate-y-1/2 ${
                        isRTL ? "left-4" : "right-4"
                      } text-gray-400 hover:text-gray-600 transition-colors`}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <PasswordStrengthIndicator
                      password={formData.password}
                      isRTL={isRTL}
                    />
                  )}
                </FormField> */}

                <FormField
                  label={
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      {t("role")}
                    </div>
                  }
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                  isRTL={isRTL}
                  error={touched.role && validationErrors.role}
                  success={
                    touched.role && formData.role && !validationErrors.role
                      ? "الدور محدد"
                      : null
                  }
                >
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 disabled:opacity-50 admin-body ${
                      isRTL ? "text-right" : "text-left"
                    } ${
                      touched.role && validationErrors.role
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    required
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <option value="user">{t("user")}</option>
                    <option value="admin">{t("admin")}</option>
                  </select>
                </FormField>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-8">
            <div className="admin-card p-6">
              <h3
                className={`admin-subheading text-lg mb-4 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("formStatus")}
              </h3>
              <div className="space-y-3">
                <StatusItem
                  completed={
                    formData.email &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                  }
                  label={t("email")}
                  isRTL={isRTL}
                  warning={touched.email && validationErrors.email}
                />
                {/* <StatusItem
                  completed={
                    isEditMode ||
                    (formData.password &&
                      formData.password.length >= 8 &&
                      !validationErrors.password)
                  }
                  label={isEditMode ? "كلمة المرور (اختياري)" : t("password")}
                  isRTL={isRTL}
                  warning={touched.password && validationErrors.password}
                /> */}
                <StatusItem
                  completed={formData.role}
                  label={t("role")}
                  isRTL={isRTL}
                  warning={touched.role && validationErrors.role}
                />
              </div>
            </div>

            <div className="admin-card p-6">
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    isFormValid() && !isSubmitting
                      ? "admin-btn-primary"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                  style={{
                    background:
                      "linear-gradient(to right, var(--primary-color), #3B82F6)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t("saving")}</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      {t("save")}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="admin-btn-secondary w-full px-6 py-4 rounded-lg font-semibold disabled:opacity-50"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
