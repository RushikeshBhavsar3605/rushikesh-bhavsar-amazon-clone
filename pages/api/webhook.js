import { buffer } from "micro";
import clientPromise from "../../lib/mongodb";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("➡️ fulfillOrder START", {
    sessionId: session.id,
    email: session?.metadata?.email,
  });

  try {
    const client = await clientPromise;
    console.log("✅ MongoDB connected");

    const db = client.db();

    const orderData = {
      order_id: session.id,
      email: session?.metadata?.email || "unknown",
      amount: (session?.amount_total || 0) / 100,
      amount_shipping: (session?.total_details?.amount_shipping || 0) / 100,
      images: (() => {
        try {
          return session?.metadata?.images
            ? JSON.parse(session.metadata.images)
            : [];
        } catch (e) {
          console.error("❌ JSON parse failed:", e);
          return [];
        }
      })(),
      timestamp: new Date(),
    };

    console.log("📦 Order Data:", orderData);

    const result = await db.collection("orders").insertOne(orderData);

    console.log("🎉 SUCCESS: Order stored", {
      insertedId: result.insertedId,
    });

    return result;
  } catch (err) {
    console.error("❌ fulfillOrder ERROR:", err);
    throw err;
  }
};

export default async (req, res) => {
  console.log("🔥 Webhook hit");

  if (req.method !== "POST") {
    console.warn("⚠️ Invalid method:", req.method);
    return res.status(405).end();
  }

  try {
    console.log("📥 Reading request buffer...");
    const requestBuffer = await buffer(req);

    console.log("📏 Buffer length:", requestBuffer.length);

    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    console.log("🔐 Signature present:", !!sig);

    let event;

    try {
      console.log("🔍 Verifying Stripe signature...");
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log("✅ Signature verified");
    } catch (err) {
      console.error("❌ Signature verification failed:", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    console.log("📢 Event received:", {
      type: event.type,
      id: event.id,
    });

    if (event.type === "checkout.session.completed") {
      console.log("💰 Handling checkout.session.completed");

      const session = event.data.object;
      console.log("🧾 FULL SESSION:", JSON.stringify(session, null, 2));

      await fulfillOrder(session);

      console.log("✅ Handler completed");
    } else {
      console.log("ℹ️ Ignored event type:", event.type);
    }

    console.log("📤 Sending 200 response");
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("💥 Webhook handler crashed:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
