// "use client";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useTranslations, useLocale } from "next-intl";
// import toast from "react-hot-toast";
// import {
//   Package,
//   Upload,
//   X,
//   Save,
//   ArrowLeft,
//   ImageIcon,
//   Loader2,
//   Star,
//   Globe,
//   Languages,
//   CheckCircle2,
//   AlertCircle,
//   ChevronDown,
// } from "lucide-react";
// import { createProduct, updateProduct, clearState } from "@/store/products"; // Import updateProduct
// import { fetchCategories } from "@/store/categories";

// const FormField = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   required = false,
//   placeholder,
//   disabled,
//   isRTL,
//   className = "",
//   children,
//   ...props
// }) => (
//   <div className={className}>
//     <label
//       className={`block text-sm font-medium mb-3 flex items-center gap-2 ${
//         isRTL ? "text-right" : "text-left"
//       }`}
//     >
//       {label}
//       {required && <span className="text-red-500">*</span>}
//       {value && required && <CheckCircle2 className="h-4 w-4 text-green-500" />}
//     </label>
//     {children || (
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 disabled:opacity-50 ${
//           isRTL ? "text-right" : "text-left"
//         }`}
//         style={{
//           focusRingColor: "var(--primary-color)",
//           borderColor: value && required ? "var(--primary-color)" : undefined,
//           direction: isRTL ? "rtl" : "ltr",
//         }}
//         placeholder={placeholder}
//         required={required}
//         dir={isRTL ? "rtl" : "ltr"} // Ensure placeholder direction is correct
//         {...props}
//       />
//     )}
//   </div>
// );

// const StatusItem = ({ completed, label, isRTL }) => (
//   <div
//     className={`flex items-center gap-2 text-sm ${
//       completed ? "text-green-600" : "text-gray-500"
//     } ${isRTL ? "text-right" : "text-left"}`}
//   >
//     {completed ? (
//       <CheckCircle2 className="h-4 w-4" />
//     ) : (
//       <AlertCircle className="h-4 w-4" />
//     )}
//     {label}
//   </div>
// );

// export default function ProductForm({ initialData = null }) {
//   // Accept initialData prop
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const locale = useLocale();
//   const t = useTranslations("products");
//   const { isLoading, error, message } = useSelector((state) => state.products);
//   const { categories, isLoading: categoriesLoading } = useSelector(
//     (state) => state.categories
//   );

//   const [activeTab, setActiveTab] = useState("ar");
//   const [formData, setFormData] = useState({
//     name_ar: "",
//     name_en: "",
//     description_ar: "",
//     description_en: "",
//     price: "",
//     discount: "0",
//     category: "",
//     stock: "",
//     isFeatured: false,
//     slug: "",
//     brand: "",
//     size: "",
//     concentration: "",
//     notes: { top: "", heart: "", base: "" }, // Ensure notes object is always initialized
//   });
//   const [images, setImages] = useState([]); // Stores File objects for new uploads
//   const [existingImages, setExistingImages] = useState([]); // Stores URLs for existing images
//   const [imagePreviews, setImagePreviews] = useState([]); // Stores Data URLs for all images (new + existing)
//   const [dragActive, setDragActive] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const isRTL = locale === "ar";
//   const isEditMode = initialData !== null;

//   useEffect(() => {
//     if (initialData) {
//       // Populate form data from initialData for editing
//       setFormData({
//         name_ar: initialData.translations?.ar?.name || "",
//         name_en: initialData.translations?.en?.name || "",
//         description_ar: initialData.translations?.ar?.description || "",
//         description_en: initialData.translations?.en?.description || "",
//         price: initialData.price?.toString() || "",
//         discount: initialData.discount?.toString() || "0",
//         category: initialData.category?._id || initialData.category || "", // Handle both object and ID
//         stock: initialData.stock?.toString() || "",
//         isFeatured: initialData.isFeatured || false,
//         slug: initialData.slug || "",
//         brand: initialData.brand || "",
//         size: initialData.size || "",
//         concentration: initialData.concentration || "",
//         notes: {
//           top: initialData.notes?.top?.join(", ") || "",
//           heart: initialData.notes?.heart?.join(", ") || "",
//           base: initialData.notes?.base?.join(", ") || "",
//         },
//       });
//       // Set existing images and their previews
//       if (initialData.images && initialData.images.length > 0) {
//         setExistingImages(initialData.images);
//         setImagePreviews(initialData.images.map((img) => `/uploads/${img}`)); // Assuming /uploads/ is the base path
//       }
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if (message) {
//       toast.success(message, {
//         duration: 4000,
//         style: { background: "var(--primary-color)", color: "white" },
//       });
//       dispatch(clearState());
//       router.push("/admin/products"); // Redirect after success
//     }
//     if (error) {
//       // Parse backend validation error and display user-friendly messages
//       if (
//         typeof error === "string" &&
//         error.includes("Product validation failed:")
//       ) {
//         const validationErrors = error.split("Product validation failed:")[1];
//         // Regex to extract field paths like "translations.en.description" or "price"
//         const errorFields = [
//           ...validationErrors.matchAll(
//             /(?:Path `)?([\w.]+)(?:` is required\.)?/g
//           ),
//         ]
//           .map((match) => match[1])
//           .filter(Boolean); // Filter out empty strings

//         errorFields.forEach((field) => {
//           // Map backend field names to translation keys using the nested structure
//           let translationKey;
//           if (field.startsWith("translations.en.")) {
//             translationKey = `form.backendValidation.translations.en.${
//               field.split(".")[2]
//             }`;
//           } else if (field.startsWith("translations.ar.")) {
//             translationKey = `form.backendValidation.translations.ar.${
//               field.split(".")[2]
//             }`;
//           } else {
//             translationKey = `form.backendValidation.${field}`;
//           }

//           // Fallback for general error if specific translation not found
//           const translatedMessage = t(translationKey);
//           if (translatedMessage === translationKey) {
//             // If translation key itself is returned, it means no translation found
//             toast.error(t("form.backendValidation.generalError"), {
//               style: { background: "#EF4444", color: "white" },
//             });
//           } else {
//             toast.error(translatedMessage, {
//               style: { background: "#EF4444", color: "white" },
//             });
//           }
//         });
//       } else {
//         // Display general error if not a validation error
//         toast.error(error, {
//           duration: 4000,
//           style: { background: "#EF4444", color: "white" },
//         });
//       }
//       dispatch(clearState());
//     }
//   }, [message, error, dispatch, router, t]); // Added t to dependency array

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (formData.name_en) {
//       const slug = formData.name_en
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)/g, "");
//       setFormData((prev) => ({ ...prev, slug }));
//     }
//   }, [formData.name_en]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.startsWith("notes.")) {
//       const noteType = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         notes: {
//           ...prev.notes, // Ensure existing notes are preserved
//           [noteType]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleImageUpload = (files) => {
//     const fileArray = Array.from(files);
//     if (images.length + existingImages.length + fileArray.length > 5) {
//       toast.error(t("validation.maxImages"), {
//         style: { background: "#F59E0B", color: "white" },
//       });
//       return;
//     }
//     const newImages = [...images, ...fileArray];
//     setImages(newImages);

//     const newPreviews = [...imagePreviews];
//     fileArray.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         newPreviews.push(e.target.result);
//         setImagePreviews([...newPreviews]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === "dragenter" || e.type === "dragover");
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files?.[0]) handleImageUpload(e.dataTransfer.files);
//   };

//   const removeImage = (indexToRemove) => {
//     const totalImages = [...existingImages, ...images];
//     const imageToRemove = totalImages[indexToRemove];

//     if (typeof imageToRemove === "string") {
//       // It's an existing image URL
//       setExistingImages(existingImages.filter((_, i) => i !== indexToRemove));
//     } else {
//       // It's a new File object
//       setImages(
//         images.filter((_, i) => i !== indexToRemove - existingImages.length)
//       );
//     }
//     setImagePreviews(imagePreviews.filter((_, i) => i !== indexToRemove));
//   };

//   const validateForm = () => {
//     const errors = [];
//     if (!formData.name_ar.trim()) errors.push(t("validation.nameArRequired"));
//     if (!formData.name_en.trim()) errors.push(t("validation.nameEnRequired"));
//     if (!formData.description_ar.trim())
//       errors.push(t("validation.descriptionArRequired"));
//     if (!formData.description_en.trim())
//       errors.push(t("validation.descriptionEnRequired"));
//     if (!formData.category) errors.push(t("validation.categoryRequired"));
//     // Updated stock validation: must be a number and not negative, AND not an empty string
//     if (
//       formData.stock === "" ||
//       isNaN(Number(formData.stock)) ||
//       Number(formData.stock) < 0
//     )
//       errors.push(t("validation.stockRequired"));
//     // Added price validation: must be a number and not negative, AND not an empty string
//     if (
//       formData.price === "" ||
//       isNaN(Number(formData.price)) ||
//       Number(formData.price) < 0
//     )
//       errors.push(t("validation.priceRequired"));
//     if (images.length + existingImages.length === 0)
//       errors.push(t("validation.imageRequired"));
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//       validationErrors.forEach((error) =>
//         toast.error(error, { style: { background: "#EF4444", color: "white" } })
//       );
//       return;
//     }
//     setIsSubmitting(true);

//     // Prepare data for Redux thunk
//     const dataToSubmit = {
//       ...formData,
//       // Process notes into arrays as expected by Mongoose Schema
//       notes: {
//         top: formData.notes.top
//           ? formData.notes.top.split(",").map((note) => note.trim())
//           : [],
//         heart: formData.notes.heart
//           ? formData.notes.heart.split(",").map((note) => note.trim())
//           : [],
//         base: formData.notes.base
//           ? formData.notes.base.split(",").map((note) => note.trim())
//           : [],
//       },
//       images: images, // New image files
//       existingImages: existingImages, // Existing image URLs
//     };

//     try {
//       if (isEditMode) {
//         await dispatch(
//           updateProduct({
//             productId: initialData._id,
//             productData: dataToSubmit,
//           })
//         );
//       } else {
//         await dispatch(createProduct(dataToSubmit));
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const calculateFinalPrice = () => {
//     const price = parseFloat(formData.price) || 0;
//     const discount = parseFloat(formData.discount) || 0;
//     return price - (price * discount) / 100;
//   };

//   const isFormValid = () =>
//     formData.name_ar.trim() &&
//     formData.name_en.trim() &&
//     formData.description_ar.trim() &&
//     formData.description_en.trim() &&
//     formData.category &&
//     // Updated stock validation: not empty string AND valid non-negative number
//     formData.stock !== "" &&
//     !isNaN(Number(formData.stock)) &&
//     Number(formData.stock) >= 0 &&
//     // Updated price validation: not empty string AND valid non-negative number
//     formData.price !== "" &&
//     !isNaN(Number(formData.price)) &&
//     Number(formData.price) >= 0 &&
//     images.length + existingImages.length > 0;

//   const getCategoryName = (category) =>
//     locale === "ar"
//       ? category.translations?.ar?.name || category.name
//       : category.translations?.en?.name || category.name;

//   const cardClass =
//     "bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50";

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
//       dir={isRTL ? "rtl" : "ltr"}
//     >
//       <div className="w-[90%] max-w-7xl mx-auto px-6 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               disabled={isSubmitting}
//               className="p-3 rounded-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700 disabled:opacity-50"
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </button>
//             <div className={isRTL ? "text-right" : "text-left"}>
//               <h1
//                 className="text-3xl font-bold tracking-tight flex items-center gap-3"
//                 style={{ color: "var(--primary-color)" }}
//               >
//                 <Package className="h-8 w-8" />
//                 {isEditMode ? t("editProduct") : t("createProduct")}
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
//                 {isEditMode
//                   ? t("editProductDescription")
//                   : t("createProductDescription")}
//               </p>
//             </div>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 xl:grid-cols-4 gap-8"
//         >
//           {/* Main Form */}
//           <div className="xl:col-span-3 space-y-8">
//             {/* Language Tabs & Basic Information */}
//             <div className={cardClass}>
//               <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-t-sm">
//                 <div className="flex">
//                   {["ar", "en"].map((lang) => (
//                     <button
//                       key={lang}
//                       type="button"
//                       onClick={() => setActiveTab(lang)}
//                       disabled={isSubmitting}
//                       className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 disabled:opacity-50`}
//                       style={{
//                         color:
//                           activeTab === lang
//                             ? "var(--primary-color)"
//                             : undefined,
//                         borderBottomColor:
//                           activeTab === lang
//                             ? "var(--primary-color)"
//                             : undefined,
//                       }}
//                     >
//                       <div className="flex items-center justify-center gap-2">
//                         {lang === "ar" ? (
//                           <Languages className="h-4 w-4" />
//                         ) : (
//                           <Globe className="h-4 w-4" />
//                         )}
//                         {t(`tabs.${lang === "ar" ? "arabic" : "english"}`)}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="p-8">
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-2 mb-6">
//                     {activeTab === "ar" ? (
//                       <Languages
//                         className="h-5 w-5"
//                         style={{ color: "var(--primary-color)" }}
//                       />
//                     ) : (
//                       <Globe
//                         className="h-5 w-5"
//                         style={{ color: "var(--primary-color)" }}
//                       />
//                     )}
//                     <h3 className="text-xl font-semibold">
//                       {t(
//                         `form.${
//                           activeTab === "ar" ? "arabicInfo" : "englishInfo"
//                         }`
//                       )}
//                     </h3>
//                     <span className="text-red-500">*</span>
//                   </div>

//                   <FormField
//                     label={t(
//                       `form.productName${activeTab === "ar" ? "Ar" : "En"}`
//                     )}
//                     name={`name_${activeTab}`}
//                     value={formData[`name_${activeTab}`]}
//                     onChange={handleInputChange}
//                     disabled={isSubmitting}
//                     required
//                     isRTL={activeTab === "ar"}
//                     placeholder={t(
//                       `form.productName${
//                         activeTab === "ar" ? "Ar" : "En"
//                       }Placeholder`
//                     )}
//                   />

//                   <FormField
//                     label={t(
//                       `form.description${activeTab === "ar" ? "Ar" : "En"}`
//                     )}
//                     name={`description_${activeTab}`}
//                     value={formData[`description_${activeTab}`]}
//                     onChange={handleInputChange}
//                     disabled={isSubmitting}
//                     required
//                     isRTL={activeTab === "ar"}
//                     placeholder={t(
//                       `form.description${
//                         activeTab === "ar" ? "Ar" : "En"
//                       }Placeholder`
//                     )}
//                   >
//                     <textarea
//                       name={`description_${activeTab}`}
//                       value={formData[`description_${activeTab}`]}
//                       onChange={handleInputChange}
//                       disabled={isSubmitting}
//                       rows={5}
//                       className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 resize-none disabled:opacity-50 ${
//                         activeTab === "ar" ? "text-right" : "text-left"
//                       }`}
//                       style={{
//                         focusRingColor: "var(--primary-color)",
//                         borderColor: formData[`description_${activeTab}`]
//                           ? "var(--primary-color)"
//                           : undefined,
//                         direction: activeTab === "ar" ? "rtl" : "ltr",
//                       }}
//                       placeholder={t(
//                         `form.description${
//                           activeTab === "ar" ? "Ar" : "En"
//                         }Placeholder`
//                       )}
//                       required
//                       dir={activeTab === "ar" ? "rtl" : "ltr"} // Ensure placeholder direction is correct
//                     />
//                   </FormField>

//                   {activeTab === "en" && (
//                     <FormField
//                       label={t("form.slug")}
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleInputChange}
//                       disabled={isSubmitting}
//                       isRTL={false}
//                       placeholder={t("form.slugPlaceholder")}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Category & Stock & Price */}
//             <div className={cardClass + " p-8"}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormField
//                   label={t("form.category")}
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   disabled={isSubmitting}
//                   required
//                   isRTL={isRTL}
//                   className="relative"
//                 >
//                   <div className="relative">
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       disabled={isSubmitting}
//                       className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 appearance-none disabled:opacity-50 ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                       style={{
//                         focusRingColor: "var(--primary-color)",
//                         borderColor: formData.category
//                           ? "var(--primary-color)"
//                           : undefined,
//                         direction: isRTL ? "rtl" : "ltr",
//                         paddingRight: isRTL ? "3rem" : "1rem",
//                         paddingLeft: isRTL ? "1rem" : "3rem",
//                       }}
//                       required
//                       dir={isRTL ? "rtl" : "ltr"} // Ensure placeholder direction is correct
//                     >
//                       <option value="">{t("form.selectCategory")}</option>
//                       {categoriesLoading ? (
//                         <option disabled>{t("form.categoriesLoading")}</option>
//                       ) : (
//                         categories.map((cat) => (
//                           <option key={cat._id} value={cat._id}>
//                             {getCategoryName(cat)}
//                           </option>
//                         ))
//                       )}
//                     </select>
//                     <ChevronDown
//                       className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none ${
//                         isRTL ? "left-3" : "right-3"
//                       }`}
//                     />
//                   </div>
//                 </FormField>

//                 <FormField
//                   label={t("form.stock")}
//                   name="stock"
//                   type="number"
//                   value={formData.stock}
//                   onChange={handleInputChange}
//                   disabled={isSubmitting}
//                   required
//                   isRTL={isRTL}
//                   placeholder={t("form.stockPlaceholder")}
//                   min="0"
//                 />
//               </div>

//               {/* Price field moved here */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 {" "}
//                 {/* Added mt-6 for spacing */}
//                 <FormField
//                   label={t("form.price")}
//                   name="price"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   disabled={isSubmitting}
//                   required
//                   isRTL={isRTL}
//                   placeholder={t("form.pricePlaceholder")}
//                 />
//                 {/* Discount field remains here */}
//                 <FormField
//                   label={t("form.discount")}
//                   name="discount"
//                   type="number"
//                   min="0"
//                   max="100"
//                   value={formData.discount}
//                   onChange={handleInputChange}
//                   disabled={isSubmitting}
//                   isRTL={isRTL}
//                   placeholder={t("form.discountPlaceholder")}
//                 />
//               </div>

//               {/* Price Calculation moved here */}
//               {formData.price !== "" &&
//                 !isNaN(Number(formData.price)) &&
//                 Number(formData.price) >= 0 && (
//                   <div
//                     className="mt-6 p-4 rounded-sm border"
//                     style={{
//                       background: `var(--primary-color)10`,
//                       borderColor: `var(--primary-color)20`,
//                     }}
//                   >
//                     <p
//                       className={`text-sm flex items-center justify-between ${
//                         isRTL ? "text-right" : "text-left"
//                       }`}
//                     >
//                       <span className="font-medium">
//                         {t("form.finalPrice")}:
//                       </span>
//                       <span
//                         className="font-bold text-lg"
//                         style={{ color: "var(--primary-color)" }}
//                       >
//                         {calculateFinalPrice().toFixed(2)} OMR
//                       </span>
//                     </p>
//                     {formData.discount > 0 && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         {t("form.originalPrice")}:{" "}
//                         <span className="line-through">
//                           {formData.price} OMR
//                         </span>
//                       </p>
//                     )}
//                   </div>
//                 )}
//             </div>

//             {/* Optional Details (remaining fields) */}
//             <div className={cardClass + " p-8"}>
//               <h3
//                 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
//                   isRTL ? "text-right" : "text-left"
//                 }`}
//               >
//                 <Package
//                   className="h-5 w-5"
//                   style={{ color: "var(--primary-color)" }}
//                 />
//                 {t("form.optionalDetails")}
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 {[
//                   { name: "brand", type: "text" },
//                   { name: "size", type: "text" },
//                 ].map((field) => (
//                   <FormField
//                     key={field.name}
//                     label={t(`form.${field.name}`)}
//                     name={field.name}
//                     type={field.type}
//                     value={formData[field.name]}
//                     onChange={handleInputChange}
//                     disabled={isSubmitting}
//                     isRTL={isRTL}
//                     placeholder={t(`form.${field.name}Placeholder`)}
//                     {...field}
//                   />
//                 ))}
//               </div>

//               <FormField
//                 label={t("form.concentration")}
//                 name="concentration"
//                 value={formData.concentration}
//                 onChange={handleInputChange}
//                 disabled={isSubmitting}
//                 isRTL={isRTL}
//                 placeholder={t("form.concentrationPlaceholder")}
//                 className="mb-8"
//               />

//               {/* Fragrance Notes */}
//               <div>
//                 <h4
//                   className={`font-medium mb-4 flex items-center gap-2 ${
//                     isRTL ? "text-right" : "text-left"
//                   }`}
//                 >
//                   <Package
//                     className="h-4 w-4"
//                     style={{ color: "var(--primary-color)" }}
//                   />
//                   {t("form.fragranceNotes")}
//                 </h4>
//                 <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
//                   <AlertCircle className="h-3 w-3" />
//                   {t("form.fragranceNotesHelp")}
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                   {["top", "heart", "base"].map((noteType) => (
//                     <FormField
//                       key={noteType}
//                       label={t(`form.${noteType}Notes`)}
//                       name={`notes.${noteType}`}
//                       value={formData.notes[noteType]}
//                       onChange={handleInputChange}
//                       disabled={isSubmitting}
//                       isRTL={isRTL}
//                       placeholder={t(`form.${noteType}NotesPlaceholder`)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Featured Product */}
//               <label className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-sm border border-yellow-200 dark:border-yellow-700 cursor-pointer hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 transition-all duration-200">
//                 <input
//                   type="checkbox"
//                   name="isFeatured"
//                   checked={formData.isFeatured}
//                   onChange={handleInputChange}
//                   disabled={isSubmitting}
//                   className="w-5 h-5 rounded border-2 border-yellow-400 text-yellow-500 focus:ring-yellow-500 focus:ring-2 disabled:opacity-50"
//                 />
//                 <Star
//                   className={`h-5 w-5 ${
//                     formData.isFeatured
//                       ? "text-yellow-500 fill-current"
//                       : "text-yellow-400"
//                   }`}
//                 />
//                 <div className={isRTL ? "text-right" : "text-left"}>
//                   <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
//                     {t("form.isFeatured")}
//                   </span>
//                   <p className="text-xs text-yellow-600 dark:text-yellow-300">
//                     {t("form.featuredDescription")}
//                   </p>
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="xl:col-span-1 space-y-8">
//             {/* Image Upload */}
//             <div className={cardClass + " p-6"}>
//               <h3
//                 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
//                   isRTL ? "text-right" : "text-left"
//                 }`}
//               >
//                 <ImageIcon
//                   className="h-5 w-5"
//                   style={{ color: "var(--primary-color)" }}
//                 />
//                 {t("form.images")}
//                 <span className="text-red-500">*</span>
//                 {images.length + existingImages.length > 0 && (
//                   <CheckCircle2 className="h-4 w-4 text-green-500" />
//                 )}
//               </h3>

//               <div
//                 className={`border-2 border-dashed rounded-sm p-6 text-center transition-all duration-300 cursor-pointer ${
//                   dragActive ? "scale-105" : "hover:bg-opacity-5"
//                 } ${isSubmitting ? "opacity-50" : ""}`}
//                 style={{
//                   borderColor: dragActive ? "var(--primary-color)" : "#D1D5DB",
//                   backgroundColor: dragActive
//                     ? `var(--primary-color)10`
//                     : undefined,
//                 }}
//                 onDragEnter={!isSubmitting ? handleDrag : undefined}
//                 onDragLeave={!isSubmitting ? handleDrag : undefined}
//                 onDragOver={!isSubmitting ? handleDrag : undefined}
//                 onDrop={!isSubmitting ? handleDrop : undefined}
//               >
//                 <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                   {t("form.imagesDescription")}
//                 </p>
//                 <p className="text-xs text-gray-500">{t("form.imagesLimit")}</p>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e.target.files)}
//                   disabled={isSubmitting}
//                   className="hidden"
//                   id="image-upload"
//                 />
//                 <label
//                   htmlFor="image-upload"
//                   className={`inline-block mt-4 px-6 py-3 text-white rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer ${
//                     isSubmitting ? "opacity-50" : ""
//                   }`}
//                   style={{
//                     background: `linear-gradient(to right, var(--primary-color), #3B82F6)`,
//                   }}
//                 >
//                   {t("form.selectImages")}
//                 </label>
//               </div>

//               {images.length + existingImages.length > 0 && (
//                 <div className="mt-6 grid grid-cols-2 gap-3">
//                   {imagePreviews.map((preview, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={preview || "/placeholder.svg"}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded-sm shadow-md"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         disabled={isSubmitting}
//                         className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:bg-red-600 disabled:opacity-50"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Form Status */}
//             <div className={cardClass + " p-6"}>
//               <h3
//                 className={`text-lg font-semibold mb-4 ${
//                   isRTL ? "text-right" : "text-left"
//                 }`}
//               >
//                 {t("form.formStatus")}
//               </h3>
//               <div className="space-y-3">
//                 <StatusItem
//                   completed={formData.name_ar && formData.name_en}
//                   label={t("form.productNames")}
//                   isRTL={isRTL}
//                 />
//                 <StatusItem
//                   completed={formData.description_ar && formData.description_en}
//                   label={t("form.productDescriptions")}
//                   isRTL={isRTL}
//                 />
//                 <StatusItem
//                   completed={formData.category}
//                   label={t("form.category")}
//                   isRTL={isRTL}
//                 />
//                 {/* Updated stock check: must not be empty string AND valid non-negative number */}
//                 <StatusItem
//                   completed={
//                     formData.stock !== "" &&
//                     !isNaN(Number(formData.stock)) &&
//                     Number(formData.stock) >= 0
//                   }
//                   label={t("form.stock")}
//                   isRTL={isRTL}
//                 />
//                 {/* Updated price check: must not be empty string AND valid non-negative number */}
//                 <StatusItem
//                   completed={
//                     formData.price !== "" &&
//                     !isNaN(Number(formData.price)) &&
//                     Number(formData.price) >= 0
//                   }
//                   label={t("form.price")}
//                   isRTL={isRTL}
//                 />
//                 <StatusItem
//                   completed={images.length + existingImages.length > 0}
//                   label={`${t("form.imagesCount")} (${
//                     images.length + existingImages.length
//                   }/5)`}
//                   isRTL={isRTL}
//                 />
//               </div>
//             </div>

//             {/* Actions */}
//             <div className={cardClass + " p-6"}>
//               <div className="space-y-4">
//                 <button
//                   type="submit"
//                   disabled={!isFormValid() || isSubmitting}
//                   className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-sm font-medium transition-all duration-300
//                 ${
//                   isFormValid() && !isSubmitting
//                     ? "text-white shadow-lg hover:shadow-xl transform hover:scale-105"
//                     : "bg-gray-300 dark:bg-gray-700 text-gray-500"
//                 }
//                 cursor-pointer disabled:cursor-not-allowed
//               `}
//                   style={{
//                     background:
//                       isFormValid() && !isSubmitting
//                         ? `linear-gradient(to right, var(--primary-color), #3B82F6)`
//                         : undefined,
//                   }}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                       <span>{t("form.saving")}</span>
//                       <div className="flex gap-1">
//                         {[0, 150, 300].map((delay, i) => (
//                           <div
//                             key={i}
//                             className="w-2 h-2 bg-white rounded-full animate-bounce"
//                             style={{ animationDelay: `${delay}ms` }}
//                           />
//                         ))}
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-5 w-5" />
//                       {t("form.save")}
//                     </>
//                   )}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => router.back()}
//                   disabled={isSubmitting}
//                   className="w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium disabled:opacity-50"
//                 >
//                   {t("form.cancel")}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import toast from "react-hot-toast";
import {
  Package,
  Upload,
  X,
  Save,
  ArrowLeft,
  ImageIcon,
  Loader2,
  Star,
  Globe,
  Languages,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { createProduct, updateProduct, clearState } from "@/store/products"; // Import updateProduct
import { fetchCategories } from "@/store/categories";

// تم تعديل FormField لقبول activeTab كخاصية
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
  activeTab,
  ...props
}) => (
  <div className={className}>
    <label
      className={`block text-sm font-medium mb-3 flex items-center gap-2 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {label}
      {required && <span className="text-red-500">*</span>}
      {value && required && <CheckCircle2 className="h-4 w-4 text-green-500" />}
    </label>
    {children || (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        // استخدام activeTab لتحديد اتجاه النص والـ placeholder
        className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 disabled:opacity-50 ${
          activeTab === "ar" ? "text-right" : "text-left"
        }`}
        style={{
          focusRingColor: "var(--primary-color)",
          borderColor: value && required ? "var(--primary-color)" : undefined,
          direction: activeTab === "ar" ? "rtl" : "ltr", // استخدام activeTab هنا أيضًا
        }}
        placeholder={placeholder}
        required={required}
        dir={activeTab === "ar" ? "rtl" : "ltr"} // استخدام activeTab هنا أيضًا
        {...props}
      />
    )}
  </div>
);

const StatusItem = ({ completed, label, isRTL }) => (
  <div
    className={`flex items-center gap-2 text-sm ${
      completed ? "text-green-600" : "text-gray-500"
    } ${isRTL ? "text-right" : "text-left"}`}
  >
    {completed ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : (
      <AlertCircle className="h-4 w-4" />
    )}
    {label}
  </div>
);

export default function ProductForm({ initialData = null }) {
  // Accept initialData prop
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("products");
  const { isLoading, error, message } = useSelector((state) => state.products);
  const { categories, isLoading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  const [activeTab, setActiveTab] = useState("ar");
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    discount: "0",
    category: "",
    stock: "",
    isFeatured: false,
    slug: "",
    brand: "",
    size: "",
    concentration: "",
    notes: { top: "", heart: "", base: "" }, // Ensure notes object is always initialized
  });
  const [images, setImages] = useState([]); // Stores File objects for new uploads
  const [existingImages, setExistingImages] = useState([]); // Stores URLs for existing images
  const [imagePreviews, setImagePreviews] = useState([]); // Stores Data URLs for all images (new + existing)
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = locale === "ar";
  const isEditMode = initialData !== null;

  useEffect(() => {
    if (initialData) {
      // Populate form data from initialData for editing
      setFormData({
        name_ar: initialData.translations?.ar?.name || "",
        name_en: initialData.translations?.en?.name || "",
        description_ar: initialData.translations?.ar?.description || "",
        description_en: initialData.translations?.en?.description || "",
        price: initialData.price?.toString() || "",
        discount: initialData.discount?.toString() || "0",
        category: initialData.category?._id || initialData.category || "", // Handle both object and ID
        stock: initialData.stock?.toString() || "",
        isFeatured: initialData.isFeatured || false,
        slug: initialData.slug || "",
        brand: initialData.brand || "",
        size: initialData.size || "",
        concentration: initialData.concentration || "",
        notes: {
          top: initialData.notes?.top?.join(", ") || "",
          heart: initialData.notes?.heart?.join(", ") || "",
          base: initialData.notes?.base?.join(", ") || "",
        },
      });
      // Set existing images and their previews
      if (initialData.images && initialData.images.length > 0) {
        setExistingImages(initialData.images);
        setImagePreviews(initialData.images.map((img) => `${img}`)); // Assuming /uploads/ is the base path
      }
    }
  }, [initialData]);

  useEffect(() => {
    if (message) {
      toast.success(message, {
        duration: 4000,
        style: { background: "var(--primary-color)", color: "white" },
      });
      dispatch(clearState());
      router.push("/admin/products"); // Redirect after success
    }
    if (error) {
      // Parse backend validation error and display user-friendly messages
      if (
        typeof error === "string" &&
        error.includes("Product validation failed:")
      ) {
        const validationErrors = error.split("Product validation failed:")[1];
        // Regex to extract field paths like "translations.en.description" or "price"
        const errorFields = [
          ...validationErrors.matchAll(
            /(?:Path `)?([\w.]+)(?:` is required\.)?/g
          ),
        ]
          .map((match) => match[1])
          .filter(Boolean); // Filter out empty strings

        errorFields.forEach((field) => {
          // Map backend field names to translation keys using the nested structure
          let translationKey;
          if (field.startsWith("translations.en.")) {
            translationKey = `form.backendValidation.translations.en.${
              field.split(".")[2]
            }`;
          } else if (field.startsWith("translations.ar.")) {
            translationKey = `form.backendValidation.translations.ar.${
              field.split(".")[2]
            }`;
          } else {
            translationKey = `form.backendValidation.${field}`;
          }

          // Fallback for general error if specific translation not found
          const translatedMessage = t(translationKey);
          if (translatedMessage === translationKey) {
            // If translation key itself is returned, it means no translation found
            toast.error(t("form.backendValidation.generalError"), {
              style: { background: "#EF4444", color: "white" },
            });
          } else {
            toast.error(translatedMessage, {
              style: { background: "#EF4444", color: "white" },
            });
          }
        });
      } else {
        // Display general error if not a validation error
        toast.error(error, {
          duration: 4000,
          style: { background: "#EF4444", color: "white" },
        });
      }
      dispatch(clearState());
    }
  }, [message, error, dispatch, router, t]); // Added t to dependency array

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (formData.name_en) {
      const slug = formData.name_en
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name_en]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("notes.")) {
      const noteType = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        notes: {
          ...prev.notes, // Ensure existing notes are preserved
          [noteType]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    if (images.length + existingImages.length + fileArray.length > 5) {
      toast.error(t("validation.maxImages"), {
        style: { background: "#F59E0B", color: "white" },
      });
      return;
    }
    const newImages = [...images, ...fileArray];
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (indexToRemove) => {
    const totalImages = [...existingImages, ...images];
    const imageToRemove = totalImages[indexToRemove];

    if (typeof imageToRemove === "string") {
      // It's an existing image URL
      setExistingImages(existingImages.filter((_, i) => i !== indexToRemove));
    } else {
      // It's a new File object
      setImages(
        images.filter((_, i) => i !== indexToRemove - existingImages.length)
      );
    }
    setImagePreviews(imagePreviews.filter((_, i) => i !== indexToRemove));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name_ar.trim()) errors.push(t("validation.nameArRequired"));
    if (!formData.name_en.trim()) errors.push(t("validation.nameEnRequired"));
    if (!formData.description_ar.trim())
      errors.push(t("validation.descriptionArRequired"));
    if (!formData.description_en.trim())
      errors.push(t("validation.descriptionEnRequired"));
    if (!formData.category) errors.push(t("validation.categoryRequired"));
    // Updated stock validation: must be a number and not negative, AND not an empty string
    if (
      formData.stock === "" ||
      isNaN(Number(formData.stock)) ||
      Number(formData.stock) < 0
    )
      errors.push(t("validation.stockRequired"));
    // Added price validation: must be a number and not negative, AND not an empty string
    if (
      formData.price === "" ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) < 0
    )
      errors.push(t("validation.priceRequired"));
    if (images.length + existingImages.length === 0)
      errors.push(t("validation.imageRequired"));
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) =>
        toast.error(error, { style: { background: "#EF4444", color: "white" } })
      );
      return;
    }
    setIsSubmitting(true);

    // Prepare data for Redux thunk
    const dataToSubmit = {
      ...formData,
      // Process notes into arrays as expected by Mongoose Schema
      notes: {
        top: formData.notes.top
          ? formData.notes.top.split(",").map((note) => note.trim())
          : [],
        heart: formData.notes.heart
          ? formData.notes.heart.split(",").map((note) => note.trim())
          : [],
        base: formData.notes.base
          ? formData.notes.base.split(",").map((note) => note.trim())
          : [],
      },
      images: images, // New image files
      existingImages: existingImages, // Existing image URLs
    };

    try {
      if (isEditMode) {
        await dispatch(
          updateProduct({
            productId: initialData._id,
            productData: dataToSubmit,
          })
        );
      } else {
        await dispatch(createProduct(dataToSubmit));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateFinalPrice = () => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return price - (price * discount) / 100;
  };

  const isFormValid = () =>
    formData.name_ar.trim() &&
    formData.name_en.trim() &&
    formData.description_ar.trim() &&
    formData.description_en.trim() &&
    formData.category &&
    // Updated stock validation: not empty string AND valid non-negative number
    formData.stock !== "" &&
    !isNaN(Number(formData.stock)) &&
    Number(formData.stock) >= 0 &&
    // Updated price validation: not empty string AND valid non-negative number
    formData.price !== "" &&
    !isNaN(Number(formData.price)) &&
    Number(formData.price) >= 0 &&
    images.length + existingImages.length > 0;

  const getCategoryName = (category) =>
    locale === "ar"
      ? category.translations?.ar?.name || category.name
      : category.translations?.en?.name || category.name;

  const cardClass =
    "bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className=" sm:max-w-[90%] max-w-[95%]  mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="p-3 rounded-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700 disabled:opacity-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h1
                className="text-3xl font-bold tracking-tight flex items-center gap-3"
                style={{ color: "var(--primary-color)" }}
              >
                <Package className="h-8 w-8" />
                {isEditMode ? t("editProduct") : t("createProduct")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                {isEditMode
                  ? t("editProductDescription")
                  : t("createProductDescription")}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 xl:grid-cols-4 gap-8"
        >
          {/* Main Form */}
          <div className="xl:col-span-3 space-y-8">
            {/* Language Tabs & Basic Information */}
            <div className={cardClass}>
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-t-sm">
                <div className="flex">
                  {["ar", "en"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTab(lang)}
                      disabled={isSubmitting}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 disabled:opacity-50`}
                      style={{
                        color:
                          activeTab === lang
                            ? "var(--primary-color)"
                            : undefined,
                        borderBottomColor:
                          activeTab === lang
                            ? "var(--primary-color)"
                            : undefined,
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {lang === "ar" ? (
                          <Languages className="h-4 w-4" />
                        ) : (
                          <Globe className="h-4 w-4" />
                        )}
                        {t(`tabs.${lang === "ar" ? "arabic" : "english"}`)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    {activeTab === "ar" ? (
                      <Languages
                        className="h-5 w-5"
                        style={{ color: "var(--primary-color)" }}
                      />
                    ) : (
                      <Globe
                        className="h-5 w-5"
                        style={{ color: "var(--primary-color)" }}
                      />
                    )}
                    <h3 className="text-xl font-semibold">
                      {t(
                        `form.${
                          activeTab === "ar" ? "arabicInfo" : "englishInfo"
                        }`
                      )}
                    </h3>
                    <span className="text-red-500">*</span>
                  </div>

                  <FormField
                    label={t(
                      `form.productName${activeTab === "ar" ? "Ar" : "En"}`
                    )}
                    name={`name_${activeTab}`}
                    value={formData[`name_${activeTab}`]}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                    isRTL={activeTab === "ar"}
                    placeholder={t(
                      `form.productName${
                        activeTab === "ar" ? "Ar" : "En"
                      }Placeholder`
                    )}
                    activeTab={activeTab} // تمرير activeTab هنا
                  />

                  <FormField
                    label={t(
                      `form.description${activeTab === "ar" ? "Ar" : "En"}`
                    )}
                    name={`description_${activeTab}`}
                    value={formData[`description_${activeTab}`]}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                    isRTL={activeTab === "ar"}
                    placeholder={t(
                      `form.description${
                        activeTab === "ar" ? "Ar" : "En"
                      }Placeholder`
                    )}
                    activeTab={activeTab} // تمرير activeTab هنا
                  >
                    <textarea
                      name={`description_${activeTab}`}
                      value={formData[`description_${activeTab}`]}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      rows={5}
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 resize-none disabled:opacity-50 ${
                        activeTab === "ar" ? "text-right" : "text-left"
                      }`}
                      style={{
                        focusRingColor: "var(--primary-color)",
                        borderColor: formData[`description_${activeTab}`]
                          ? "var(--primary-color)"
                          : undefined,
                        direction: activeTab === "ar" ? "rtl" : "ltr",
                      }}
                      placeholder={t(
                        `form.description${
                          activeTab === "ar" ? "Ar" : "En"
                        }Placeholder`
                      )}
                      required
                      dir={activeTab === "ar" ? "rtl" : "ltr"} // Ensure placeholder direction is correct
                    />
                  </FormField>

                  {activeTab === "en" && (
                    <FormField
                      label={t("form.slug")}
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      isRTL={false}
                      placeholder={t("form.slugPlaceholder")}
                      activeTab={activeTab} // تمرير activeTab هنا
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Category & Stock & Price */}
            <div className={cardClass + " p-8"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label={t("form.category")}
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  isRTL={isRTL}
                  className="relative"
                  activeTab={activeTab} // تمرير activeTab هنا
                >
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 transition-all duration-200 appearance-none disabled:opacity-50 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      style={{
                        focusRingColor: "var(--primary-color)",
                        borderColor: formData.category
                          ? "var(--primary-color)"
                          : undefined,
                        direction: isRTL ? "rtl" : "ltr",
                        paddingRight: isRTL ? "3rem" : "1rem",
                        paddingLeft: isRTL ? "1rem" : "3rem",
                      }}
                      required
                      dir={isRTL ? "rtl" : "ltr"} // Ensure placeholder direction is correct
                    >
                      <option value="">{t("form.selectCategory")}</option>
                      {categoriesLoading ? (
                        <option disabled>{t("form.categoriesLoading")}</option>
                      ) : (
                        categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {getCategoryName(cat)}
                          </option>
                        ))
                      )}
                    </select>
                    <ChevronDown
                      className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none ${
                        isRTL ? "left-3" : "right-3"
                      }`}
                    />
                  </div>
                </FormField>

                <FormField
                  label={t("form.stock")}
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  isRTL={isRTL}
                  placeholder={t("form.stockPlaceholder")}
                  min="0"
                  activeTab={activeTab} // تمرير activeTab هنا
                />
              </div>

              {/* Price field moved here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {" "}
                {/* Added mt-6 for spacing */}
                <FormField
                  label={t("form.price")}
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  isRTL={isRTL}
                  placeholder={t("form.pricePlaceholder")}
                  activeTab={activeTab} // تمرير activeTab هنا
                />
                {/* Discount field remains here */}
                <FormField
                  label={t("form.discount")}
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  isRTL={isRTL}
                  placeholder={t("form.discountPlaceholder")}
                  activeTab={activeTab} // تمرير activeTab هنا
                />
              </div>

              {/* Price Calculation moved here */}
              {formData.price !== "" &&
                !isNaN(Number(formData.price)) &&
                Number(formData.price) >= 0 && (
                  <div
                    className="mt-6 p-4 rounded-sm border"
                    style={{
                      background: `var(--primary-color)10`,
                      borderColor: `var(--primary-color)20`,
                    }}
                  >
                    <p
                      className={`text-sm flex items-center justify-between ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="font-medium">
                        {t("form.finalPrice")}:
                      </span>
                      <span
                        className="font-bold text-lg"
                        style={{ color: "var(--primary-color)" }}
                      >
                        {calculateFinalPrice().toFixed(2)} OMR
                      </span>
                    </p>
                    {formData.discount > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {t("form.originalPrice")}:{" "}
                        <span className="line-through">
                          {formData.price} OMR
                        </span>
                      </p>
                    )}
                  </div>
                )}
            </div>

            {/* Optional Details (remaining fields) */}
            <div className={cardClass + " p-8"}>
              <h3
                className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <Package
                  className="h-5 w-5"
                  style={{ color: "var(--primary-color)" }}
                />
                {t("form.optionalDetails")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { name: "brand", type: "text" },
                  { name: "size", type: "text" },
                ].map((field) => (
                  <FormField
                    key={field.name}
                    label={t(`form.${field.name}`)}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    isRTL={isRTL}
                    placeholder={t(`form.${field.name}Placeholder`)}
                    activeTab={activeTab} // تمرير activeTab هنا
                    {...field}
                  />
                ))}
              </div>

              <FormField
                label={t("form.concentration")}
                name="concentration"
                value={formData.concentration}
                onChange={handleInputChange}
                disabled={isSubmitting}
                isRTL={isRTL}
                placeholder={t("form.concentrationPlaceholder")}
                className="mb-8"
                activeTab={activeTab} // تمرير activeTab هنا
              />

              {/* Fragrance Notes */}
              <div>
                <h4
                  className={`font-medium mb-4 flex items-center gap-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <Package
                    className="h-4 w-4"
                    style={{ color: "var(--primary-color)" }}
                  />
                  {t("form.fragranceNotes")}
                </h4>
                <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {t("form.fragranceNotesHelp")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {["top", "heart", "base"].map((noteType) => (
                    <FormField
                      key={noteType}
                      label={t(`form.${noteType}Notes`)}
                      name={`notes.${noteType}`}
                      value={formData.notes[noteType]}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      isRTL={isRTL}
                      placeholder={t(`form.${noteType}NotesPlaceholder`)}
                      activeTab={activeTab} // تمرير activeTab هنا
                    />
                  ))}
                </div>
              </div>

              {/* Featured Product */}
              <label className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-sm border border-yellow-200 dark:border-yellow-700 cursor-pointer hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 transition-all duration-200">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-5 h-5 rounded border-2 border-yellow-400 text-yellow-500 focus:ring-yellow-500 focus:ring-2 disabled:opacity-50"
                />
                <Star
                  className={`h-5 w-5 ${
                    formData.isFeatured
                      ? "text-yellow-500 fill-current"
                      : "text-yellow-400"
                  }`}
                />
                <div className={isRTL ? "text-right" : "text-left"}>
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    {t("form.isFeatured")}
                  </span>
                  <p className="text-xs text-yellow-600 dark:text-yellow-300">
                    {t("form.featuredDescription")}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-8">
            {/* Image Upload */}
            <div className={cardClass + " p-6"}>
              <h3
                className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <ImageIcon
                  className="h-5 w-5"
                  style={{ color: "var(--primary-color)" }}
                />
                {t("form.images")}
                <span className="text-red-500">*</span>
                {images.length + existingImages.length > 0 && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </h3>

              <div
                className={`border-2 border-dashed rounded-sm p-6 text-center transition-all duration-300 cursor-pointer ${
                  dragActive ? "scale-105" : "hover:bg-opacity-5"
                } ${isSubmitting ? "opacity-50" : ""}`}
                style={{
                  borderColor: dragActive ? "var(--primary-color)" : "#D1D5DB",
                  backgroundColor: dragActive
                    ? `var(--primary-color)10`
                    : undefined,
                }}
                onDragEnter={!isSubmitting ? handleDrag : undefined}
                onDragLeave={!isSubmitting ? handleDrag : undefined}
                onDragOver={!isSubmitting ? handleDrag : undefined}
                onDrop={!isSubmitting ? handleDrop : undefined}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t("form.imagesDescription")}
                </p>
                <p className="text-xs text-gray-500">{t("form.imagesLimit")}</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  disabled={isSubmitting}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`inline-block mt-4 px-6 py-3 text-white rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                  style={{
                    background: `linear-gradient(to right, var(--primary-color), #3B82F6)`,
                  }}
                >
                  {t("form.selectImages")}
                </label>
              </div>

              {images.length + existingImages.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-sm shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={isSubmitting}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:bg-red-600 disabled:opacity-50"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Status */}
            <div className={cardClass + " p-6"}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("form.formStatus")}
              </h3>
              <div className="space-y-3">
                <StatusItem
                  completed={formData.name_ar && formData.name_en}
                  label={t("form.productNames")}
                  isRTL={isRTL}
                />
                <StatusItem
                  completed={formData.description_ar && formData.description_en}
                  label={t("form.productDescriptions")}
                  isRTL={isRTL}
                />
                <StatusItem
                  completed={formData.category}
                  label={t("form.category")}
                  isRTL={isRTL}
                />
                {/* Updated stock check: must not be empty string AND valid non-negative number */}
                <StatusItem
                  completed={
                    formData.stock !== "" &&
                    !isNaN(Number(formData.stock)) &&
                    Number(formData.stock) >= 0
                  }
                  label={t("form.stock")}
                  isRTL={isRTL}
                />
                {/* Updated price check: must not be empty string AND valid non-negative number */}
                <StatusItem
                  completed={
                    formData.price !== "" &&
                    !isNaN(Number(formData.price)) &&
                    Number(formData.price) >= 0
                  }
                  label={t("form.price")}
                  isRTL={isRTL}
                />
                <StatusItem
                  completed={images.length + existingImages.length > 0}
                  label={`${t("form.imagesCount")} (${
                    images.length + existingImages.length
                  }/5)`}
                  isRTL={isRTL}
                />
              </div>
            </div>

            {/* Actions */}
            <div className={cardClass + " p-6"}>
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-sm font-medium transition-all duration-300
                ${
                  isFormValid() && !isSubmitting
                    ? "text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500"
                }
                cursor-pointer disabled:cursor-not-allowed
              `}
                  style={{
                    background:
                      isFormValid() && !isSubmitting
                        ? `linear-gradient(to right, var(--primary-color), #3B82F6)`
                        : undefined,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>{t("form.saving")}</span>
                      <div className="flex gap-1">
                        {[0, 150, 300].map((delay, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: `${delay}ms` }}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      {t("form.save")}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  {t("form.cancel")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
