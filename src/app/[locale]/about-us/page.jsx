import { useTranslations } from "next-intl";
import {
  Sparkles,
  Eye,
  Target,
  Heart,
  Droplets,
  Star,
  Globe,
  Phone,
  Mail,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { WhatsApp } from "@mui/icons-material";
import CustomImage from "@/components/customImage";
import { gallaryImages } from "@/data";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
              <Sparkles className="w-5 h-5" />
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              {t("hero.title")}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t("hero.description")}
            </p>

            {/* Decorative perfume bottles */}
            <div className="flex justify-center items-center gap-8 mt-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-16 bg-gradient-to-b from-primary/20 to-primary/40 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 ${
                    i === 3
                      ? "h-20 w-6"
                      : i === 2 || i === 4
                      ? "h-18 w-5"
                      : "h-16 w-4"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto space-y-20">
          {/* Vision, Mission, Values */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Vision */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("vision.title")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("vision.description")}
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("mission.title")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("mission.description")}
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("values.title")}
                </h3>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                  <p>
                    <strong>{t("values.quality.title")}</strong> –{" "}
                    {t("values.quality.description")}
                  </p>
                  <p>
                    <strong>{t("values.innovation.title")}</strong> –{" "}
                    {t("values.innovation.description")}
                  </p>
                  <p>
                    <strong>{t("values.transparency.title")}</strong> –{" "}
                    {t("values.transparency.description")}
                  </p>
                  <p>
                    <strong>{t("values.excellence.title")}</strong> –{" "}
                    {t("values.excellence.description")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ingredients Section */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                {t("ingredients.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("ingredients.description")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {[
                {
                  key: "flowers",
                  color: "from-rose-500/10 to-rose-600/20",
                  icon: "🌸",
                },
                {
                  key: "woods",
                  color: "from-amber-500/10 to-amber-600/20",
                  icon: "🌳",
                },
                {
                  key: "musk",
                  color: "from-indigo-500/10 to-indigo-600/20",
                  icon: "🦌",
                },
                {
                  key: "amber",
                  color: "from-orange-500/10 to-orange-600/20",
                  icon: "💎",
                },
              ].map((ingredient, i) => (
                <Card
                  key={i}
                  className={`group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br ${ingredient.color}`}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-4xl">{ingredient.icon}</div>
                    <h4 className="font-bold text-lg text-foreground">
                      {t(`ingredients.items.${ingredient.key}`)}
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose OSMA */}
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-12">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-bold text-foreground">
                {t("whyChoose.title")}
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {[
                  {
                    key: "lasting",
                    icon: <Droplets className="w-8 h-8" />,
                    color: "text-blue-600",
                  },
                  {
                    key: "design",
                    icon: <Star className="w-8 h-8" />,
                    color: "text-purple-600",
                  },
                  {
                    key: "experience",
                    icon: <Heart className="w-8 h-8" />,
                    color: "text-pink-600",
                  },
                  {
                    key: "support",
                    icon: <Phone className="w-8 h-8" />,
                    color: "text-green-600",
                  },
                ].map((feature, i) => (
                  <div key={i} className="group text-center space-y-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${feature.color}`}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-lg text-foreground">
                      {t(`whyChoose.features.${feature.key}`)}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Presence */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">
                {t("presence.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("presence.description")}
              </p>
            </div>

            <div className="flex justify-center">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t("presence.region")}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t("presence.countries")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-foreground">
              {t("gallery.title")}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {gallaryImages.map((img, i) => (
                <div
                  key={i}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 hover:shadow-xl transition-all duration-300"
                >
                  <CustomImage src={img?.image} priority={true} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-20 bg-gradient-to-b from-white/30 to-white/10 rounded-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-bold">
                      {t("gallery.perfume")} {i}
                    </h4>
                    <p className="text-sm">{t(img?.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-bold text-foreground">
                {t("contact.title")}
              </h2>

              <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">
                    {t("contact.phone.title")}
                  </h4>
                  <a
                    href="tel:+96891234567"
                    className="text-muted-foreground tracking-wide"
                  >
                    {t("contact.phone.number")}
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">
                    {t("contact.email.title")}
                  </h4>
                  <a
                    href="mailto:osmaoman7@gmail.com"
                    className="text-muted-foreground tracking-wide"
                  >
                    {t("contact.email.address")}
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">
                    {t("contact.social.title")}
                  </h4>
                  <div className="flex justify-center items-center gap-4">
                    <a
                      href="https://www.instagram.com/osma_sur?igsh=MTUwanM0cjNhOXg3Mw=="
                      variant="ghost"
                      size="icon"
                      className="rounded-full  hover:text-[var(--primary-color)] duration-200"
                      target="_blank"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://wa.me/96877117906"
                      variant="ghost"
                      size="icon"
                      className="rounded-full   hover:text-[var(--primary-color)] duration-200"
                      target="_blank"
                    >
                      <WhatsApp className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.facebook.com/share/1AsmBnpa9B/"
                      variant="ghost"
                      size="icon"
                      className="rounded-full   hover:text-[var(--primary-color)] duration-200"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/products">
                      <Sparkles className="mr-2 h-5 w-5" />
                      {t("footer.cta.products")}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="rounded-full bg-transparent"
                  >
                    <Link href="/offers">{t("footer.cta.shop")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
