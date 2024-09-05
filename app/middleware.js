import { NextResponse } from "next/server";

export async function middleware(request) {
  // Define the marketing buckets
  const MARKETING_BUCKETS = ["original", "a", "b"];

  if (request.url.includes("/marketing")) {
    // Function to get a random bucket
    const getBucket = () => {
      return MARKETING_BUCKETS[
        Math.floor(Math.random() * MARKETING_BUCKETS.length)
      ];
    };

    // Redirect to a random marketing bucket
    return NextResponse.redirect(
      new URL(`marketing/${getBucket()}`, request.url)
    );
  }

  // Allow the request to continue if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ["/marketing"],
};
