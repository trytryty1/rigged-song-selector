import "server-only";

import { NextResponse } from "next/server";

export async function POST(request) {
  const { song } = await request.json();
  const googleSearchResponse = await fetch(
    `https://www.google.com/search?q=${song}&safe=active&tbm=isch&source=hp`,
    {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    }
  );

  const rawHtml = await googleSearchResponse.text();

  // Get the first image src
  // make sure the url always starts with https://
  const regex = /<img[^>]+src="(https:\/\/[^"]+)"/;
  const firstImageSrc = rawHtml.match(regex)[1];

  console.log(firstImageSrc);

  return NextResponse.json({ src: firstImageSrc });
}
