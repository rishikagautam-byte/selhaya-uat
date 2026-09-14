/* eslint-disable @typescript-eslint/no-explicit-any */
const SHOPIFY_STORE = import.meta.env.VITE_SHOPIFY_STORE;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2024-10";

// Fallback to standard URL format if store domain doesn't include .myshopify.com
const SHOPIFY_STOREFRONT_URL = SHOPIFY_STORE?.includes("myshopify.com")
  ? `https://${SHOPIFY_STORE}/api/${API_VERSION}/graphql.json`
  : `https://${SHOPIFY_STORE}.myshopify.com/api/${API_VERSION}/graphql.json`;

export async function storeFrontFetch(query: string, variables: any = {}) {
  if (!SHOPIFY_STORE || !STOREFRONT_TOKEN) {
    throw new Error("Missing Shopify Storefront configuration in environment variables.");
  }

  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "GraphQL query error");
  }

  return result.data;
}

// Extract error messages from Shopify's userErrors array
function formatUserErrors(userErrors: any[]): string | null {
  if (!userErrors || userErrors.length === 0) return null;
  return userErrors.map((err: any) => err.message).join(", ");
}

export async function shopifyLogin(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const data = await storeFrontFetch(query, {
    input: { email, password },
  });

  const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

  const errorMsg = formatUserErrors(customerUserErrors);
  if (errorMsg) throw new Error(errorMsg);

  if (!customerAccessToken) {
    throw new Error("Failed to authenticate. Please check your credentials.");
  }

  return customerAccessToken; // { accessToken, expiresAt }
}

export async function shopifyRegister(firstName: string, lastName: string, email: string, password: string) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const data = await storeFrontFetch(query, {
    input: { firstName, lastName, email, password },
  });

  const { customer, customerUserErrors } = data.customerCreate;

  const errorMsg = formatUserErrors(customerUserErrors);
  if (errorMsg) throw new Error(errorMsg);

  if (!customer) {
    throw new Error("Failed to create account.");
  }

  // After successful registration, log them in to get an access token
  return shopifyLogin(email, password);
}

export async function shopifyForgotPassword(email: string) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const data = await storeFrontFetch(query, { email });

  const { customerUserErrors } = data.customerRecover;
  const errorMsg = formatUserErrors(customerUserErrors);
  if (errorMsg) throw new Error(errorMsg);

  return true;
}

export async function shopifyResetPassword(id: string, resetToken: string, password: string) {
  const query = `
    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
      customerReset(id: $id, input: $input) {
        customer {
          id
          email
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const customerId = `gid://shopify/Customer/${id}`;

  const data = await storeFrontFetch(query, {
    id: customerId,
    input: {
      resetToken,
      password,
    },
  });

  const { customer, customerAccessToken, customerUserErrors } = data.customerReset;

  const errorMsg = formatUserErrors(customerUserErrors);
  if (errorMsg) throw new Error(errorMsg);

  if (!customer) {
    throw new Error("Failed to reset password.");
  }

  return customerAccessToken; // Return token if we want to log them in directly
}

export async function shopifyGetCustomer(accessToken: string) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        addresses(first: 10) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              zip
              country
              phone
              firstName
              lastName
              company
            }
          }
        }
      }
    }
  `;

  const data = await storeFrontFetch(query, {
    customerAccessToken: accessToken,
  });

  return data.customer;
}
