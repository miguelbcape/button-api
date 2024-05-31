import { notFound } from "next/navigation";
import { langs, defaulLangs } from "@/libs/config";

interface Data {
  params: {
    lang: string;
  };
}

export default function HomePage({ params: { lang } }: Data) {
  if (!langs.includes(lang)) notFound();

  return (
    <div className="flex justify-center items-center">
      <p className="text-xl">Commig soon</p>
    </div>
  );
}
