"use client";
import { useEffect, useState } from "react";
import { FaSpinner, FaDownload } from "react-icons/fa";

export const dynamic = 'force-dynamic'

interface Data {
  id: string;
  locale: {
    name_mp3: string;
    name_mp4: string;
    convert: string;
    load: string;
  };
  format: "mp3" | "mp4";
}

export default function Button({ id, locale, format }: Data) {
  const { name_mp3, name_mp4, convert, load } = locale;

  const [isTitle, setIsTitle] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isMemo, setIsMemo] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInit = async () => {
      if (!id) {
        setIsLoading(false);
        setIsError(true);
        return;
      }
      try {
        const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
        const apiInfo = await fetch(apiUrl);
        if (!apiInfo.ok) {
          setIsLoading(false);
          setIsError(true);
          return;
        }
        const { title } = await apiInfo.json();
        document.title = title; //ponemos el titulo al boton
        setIsTitle(title);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchInit();
  }, [id]);

  const handleClick = async (link: string) => {
    if (link && link.length > 0) {
      window.open(link, "_blank");
      return;
    }
    setIsClicked(true);
    try {
      const response = await fetch(
        `https://apis.noimgs.net/yt/convert?id=${id}&format=${format}`
      );

      const { error, url } = await response.json();

      if (error) {
        window.location.reload(); // Recargar la página en caso de error
        return;
      }

      if (typeof window !== "undefined") {
        // Verificar si estamos en el navegador
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;
        document.body.appendChild(iframe);
        iframe.onload = () => {
          document.body.removeChild(iframe);
        };
        iframe.onerror = () => {
          document.body.removeChild(iframe);
        };
      }

      setIsMemo(url);
      setIsClicked(false);
    } catch (error) {}
  };

  return (
    <div className={format}>
      <button
        className="l"
        onClick={() => handleClick(isMemo)}
        disabled={isError}
      >
        <span>
          {isClicked ? (
            <b>
              <FaSpinner className="spin" />
              <u>{convert}</u>
            </b>
          ) : (
            <b className="pulse">
              <FaDownload />
              <u>{format === "mp3" ? name_mp3 : name_mp4}</u>
            </b>
          )}

          {isError ? (
            <i>ID no found</i>
          ) : isloading ? (
            <i className="ld">{load}</i>
          ) : (
            <i className="parpadeo">{isTitle}</i>
          )}
        </span>
      </button>
    </div>
  );
}
