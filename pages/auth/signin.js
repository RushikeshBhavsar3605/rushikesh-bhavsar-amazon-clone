import Header from "@/Components/Header";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import amazonLogo from "../../public/amazonLogo.png";
import Image from "next/image";
import Head from "next/head";

function signIn({ providers }) {
  return (
    <div className="bg-gray-600">
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-16 px-14 text-center">
        <Image className="w-80" src={amazonLogo} alt="This is an Amazon logo" />

        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="mt-auto p-3 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300  focus:outline-none focus:ring-2 focus-yellow-500 active:from-yellow-500 rounded-lg"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
