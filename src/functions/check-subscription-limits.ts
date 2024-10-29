import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const resourceLimits: any = {
  Free: { employees: 5, projects: 2 },
  Pro: { employees: 20, projects: 10 },
  Business: { employees: Infinity, projects: Infinity },
};

export const checkSubscriptionLimits = async (
  organizationId: string,
  resourceType: "employees" | "projects",
  currentCount: number
) => {
  try {
    const customers = await stripe.customers.list({
        limit: 100,
      });
  
      const organizationCustomers = customers.data.filter(
        (customer) => customer.metadata.organizationId === organizationId
      );


    const subscriptionId = organizationCustomers[0]?.subscriptions?.data[0]?.id;

    if (!subscriptionId) {
      throw new Error("No active subscription found.");
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const product = await stripe.products.retrieve( subscription.items.data[0].price.product as string);
    const subscriptionPlan = product.name;

    const limit = resourceLimits[subscriptionPlan][resourceType];

    if (currentCount >= limit) {
      throw new Error(`Limit exceeded for ${resourceType}: ${limit}`);
    }

    return true;
  } catch (error) {
    throw error;
  }
};