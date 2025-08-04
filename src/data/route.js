export const routes = [
  { href: "/", label: "home" },
  {
    label: "categories",
    subItems: [
      {
        href: "/categories/men",
        label: "men",
        description: "Men's clothing and accessories",
      },
      {
        href: "/categories/women",
        label: "women",
        description: "Latest trends for women",
      },
      {
        href: "/categories/unisex",
        label: "unisex",
        description: "Styles for everyone",
      },
      {
        href: "/categories/hair-perfumes",
        label: "hair_perfumes",
        description: "Fragrances for your hair",
      },
      {
        href: "/categories/body-sprays",
        label: "body_sprays",
        description: "Refreshing body sprays",
      },
      {
        href: "/categories/air-fresheners",
        label: "air_fresheners",
        description: "Keep your space fresh",
      },
    ],
  },
  { href: "/offers", label: "offers" },
  { href: "/about-us", label: "about_us" },
];

export const routesFooter = [
  { label: "home", href: "/" },
  // { label: "products", href: "/products" },
  { label: "about_us", href: "/about-us" },
  { label: "footer_men_perfumes", href: "/categories/men" },
  { label: "footer_women_perfumes", href: "/categories/women" },
  { label: "footer_body_sprays", href: "/categories/body-sprays" },
  // { label: "footer_contact_us", href: "/contact" },
];

export const accountRoutes = [
  { label: "footer_login", href: "/login" },
  { label: "footer_logout", href: "/logout" },
  // يمكنك إضافة المزيد من الروابط هنا مثل:
  // { label: "My Orders", href: "/my-orders" },
  // { label: "My Profile", href: "/profile" },
];
