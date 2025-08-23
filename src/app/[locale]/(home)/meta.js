import en from "../../../messages/en.json";
import ar from "../../../messages/ar.json";
import { generatePageMeta } from "@/utils/metaUtils";

export async function generateMetadata({ params }) {
  const locale = params.locale || "en";
  return generatePageMeta(locale, { en, ar }, "Home");
}
