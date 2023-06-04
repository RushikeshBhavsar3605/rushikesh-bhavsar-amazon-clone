import Header from "@/Components/Header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { useRouter } from "next/router";

function success() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>

          <p>
            Thank you for shopping with us, We'll send a confirmation once your
            item has shipped, if you would like to check the status of your
            order(s) please press the link below.
          </p>

          <button
            onClick={() => router.push("/orders")}
            className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus-yellow-500 active:from-yellow-500 mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;
