import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { isLocale, withLocale } from "@/lib/locale";

/**
 * The gallery was replaced by /studios. Kept as a redirect so existing links
 * and anything already indexed still land somewhere useful.
 */
export default async function Gallery({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  redirect(withLocale("/studios", lang));
}
