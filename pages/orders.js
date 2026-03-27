import Header from "@/Components/Header";
import Order from "@/Components/Order";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import clientPromise from "../lib/mongodb";

function Orders({ orders }) {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders?.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // MongoDB connection
  const client = await clientPromise;
  const db = client.db();

  const mongoOrders = await db
    .collection("orders")
    .find({ email: session.user.email })
    .sort({ timestamp: -1 })
    .toArray();

  const orders = await Promise.all(
    mongoOrders.map(async (order) => ({
      id: order.order_id,
      amount: order.amount,
      amountShipping: order.amount_shipping,
      images: order.images,
      timestamp: moment(order.timestamp).unix(),
      items: await (async () => {
        try {
          return (
            await stripe.checkout.sessions.listLineItems(order.order_id, {
              limit: 100,
            })
          ).data;
        } catch (error) {
          console.error(`Error fetching items for order ${order.order_id}:`, error.message);
          return [];
        }
      })(),
    }))
  );

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)), // ensure data is serializable
    },
  };
}
