import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET! || "sk_test_51Q9lFJKT4uALUwNbQ24h8dhZLpfWXmf9QjxUNajM2WuHZDt5MAtFfmYvAay0LfExDfFJU7JLzuIL1fGZPQBDfO1r00oAYX4HjQ");

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
    console.log(resourceLimits["Free"][resourceType] , currentCount)
    if (resourceLimits["Free"][resourceType] > currentCount) {
      return true;
    }

      const customers = await stripe.customers.list({
          limit: 100,
        });
        
        console.log("organizationId------------------>", customers)
        const organizationCustomer = customers.data.find(
          (customer) => customer.metadata.organizationId === organizationId
        );
        
        console.log("customersss.............", organizationCustomer);

        if (!organizationCustomer) {
          throw new Error("No customer found for the given organization.");
        }
    
        const subscriptions = await stripe.subscriptions.list({
          customer: organizationCustomer.id,
          status: "active",
          limit: 1
        });
    
        const subscription = subscriptions.data[0];
        if (!subscription) {
          throw new Error("No active subscription found.");
        }
    
        const product = await stripe.products.retrieve(
          subscription.items.data[0].price.product as string
        );
        const subscriptionPlan = product.name;
    
        const limit = resourceLimits[subscriptionPlan]?.[resourceType];
        if (limit === undefined) {
          throw new Error(`No limit defined for the resource type: ${resourceType}`);
        }
    
        if (currentCount >= limit) {
          throw new Error(`Limit exceeded for ${resourceType}: ${limit}`);
        }
    
        return true;
  } catch (error) {
    throw error;
  }
};