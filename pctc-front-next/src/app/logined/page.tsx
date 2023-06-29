"use client";

import { createCookie } from "@/function/cookie/CreateCookie";
import { getURL } from "next/dist/shared/lib/utils";

export default function LoginedPage() {
  if (typeof window !== "undefined") {
    let url = getURL();
    const splitURL: string[] = url.split("?");

    if (typeof splitURL[1] !== "undefined") {
      const token: string = splitURL[1].slice(0, splitURL[1].length - 8);
      const username: string = splitURL[2];
      createCookie({
        isLogin: true,
        user: {
          username: username,
          token: token,
        },
      });
    }

    window.location.href = "/";
  }

  return <></>;
}
