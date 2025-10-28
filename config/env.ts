const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

if (typeof window === "undefined" && !env.NEXT_PUBLIC_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
}

export default env;

