import { notFound } from "next/navigation";
import Button from "@/app/components/button";
import { langs } from "@/libs/config";

interface Data {
  params: {
    id: string;
    lang: string;
  };
}

export default async function ButtonMp3({ params: { id, lang } }: Data) {
  if (!langs.includes(lang)) notFound();

  const locale = await import(`@/messages/${lang}.json`).then(
    (m) => m.default
  );

  return <Button id={id} locale={locale} format="mp4"/>;
}