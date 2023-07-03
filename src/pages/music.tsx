import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

interface MusicItem {
  src: string;
  alt: string;
  text: string;
}

const Music: NextPage = () => {
  const musicItems: MusicItem[] = [
    {
      src: "/img/ampm.png",
      alt: "AMPM Remix",
      text: "NOTD - AM:PM (Ray Bondo Remix)",
    },
    // {
    //   src: "/img/ampm.png",
    //   alt: "AMPM Remix",
    //   text: "NOTD - AM:PM (Ray Bondo Remix)",
    // },
    // {
    //   src: "/img/ampm.png",
    //   alt: "AMPM Remix",
    //   text: "NOTD - AM:PM (Ray Bondo Remix)",
    // },
  ];

  return (
    <>
      <Head>
        <title>Ray Bondo // Music</title>
        <meta name="description" content="Ray Bondo" />
        <link rel="icon" href="/img/rb.png" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="container grid grid-cols-1 items-center justify-center gap-16 px-4 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <h1
            style={{ fontFamily: "Nimbus" }}
            className="col-span-full whitespace-nowrap text-center text-[8vw] font-extrabold tracking-wide text-white"
          >
            Music
          </h1>
          {musicItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center transition-transform hover:scale-105"
            >
              <div>
                <Image
                  src={item.src}
                  width={500}
                  height={500}
                  alt={item.alt}
                  className="cursor-pointer"
                />
                <p className="mt-4 cursor-pointer text-lg font-bold text-white">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Music;
