import React, { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { api } from "~/utils/api";

interface MenuItem {
  href: string;
  text: string;
}

const Home: NextPage = () => {
  //   const { data: sessionData } = useSession();
  //   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //     undefined,
  //     { enabled: Boolean(sessionData?.user) }
  //   );
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = (): void => setIsOpen(!isOpen);

  const menuItems: MenuItem[] = [
    // {
    //   href: "/music",
    //   text: "Music",
    // },
    // {
    //   href: "https://instagram.com/brayschurman",
    //   text: "Instagram",
    // },
    // {
    //   href: "/projects/blocktimer",
    //   text: "BlockTimer",
    // },
    {
      href: "https://www.linkedin.com/in/brayschurman",
      text: "LinkedIn",
    },
    {
      href: "https://github.com/brayschurman",
      text: "Github",
    },
    // {
    //   href: "contact",
    //   text: "Contact",
    // },
    // {
    //   href: "/info",
    //   text: "Info",
    // },
  ];

  return (
    <>
      <Head>
        <title>BR4Y</title>
        <meta name="description" content="BR4Y" />
        <link rel="icon" href="/img/rb.png" />
      </Head>

      <nav className="fixed left-0 top-0 my-2 flex h-16 w-full items-center justify-between bg-black px-10">
        {/* <Link
          href="/music"
          className="hidden text-xl text-white hover:text-teal-500 sm:block sm:text-[3rem]"
        >
          Music
        </Link>
        <Link
          href="/contact"
          className="hidden text-xl text-white hover:text-teal-500 sm:block sm:text-[3rem]"
        >
          Contact
        </Link> */}

        <div className="relative sm:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="hover:text-[#00FFD1]-500 items-center justify-center text-[2rem] text-xl text-white"
          >
            <div className="flex sm:hidden">Menu</div>
          </button>
          {isOpen && (
            <div className="absolute left-0 z-50 mt-2 w-48 rounded-md bg-black py-1 text-white shadow-lg">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="hover:text-[#00FFD1]-500 block px-4 py-2 text-xl"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="flex min-h-screen flex-col items-center justify-center bg-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* <h1 className="font-suisse text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            BRAY
          </h1> */}
          <Image
            src="/images/bray.webp"
            alt="RB"
            width={300}
            height={300}
            className="rounded-full border-4 border-white"
          />

          <h1
            style={{ fontFamily: "Nimbus" }}
            className="whitespace-nowrap text-[4vw] font-extrabold tracking-wide text-white"
          >
            Bray Schurman
          </h1>

          <div className="fixed bottom-0 my-2 hidden h-16 w-full items-center justify-between space-x-4 bg-black px-10 sm:flex">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                target="_blank"
                href={item.href}
                className="text-lg text-white hover:text-[#00FFD1] sm:text-[2rem]"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* <AuthShowcase /> */}
    </>
  );
};

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined,
//     { enabled: Boolean(sessionData?.user) }
//   );

//   const signInOrOut = (): void => (sessionData ? signOut() : signIn());

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         type="button"
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={signInOrOut}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };

export default Home;
