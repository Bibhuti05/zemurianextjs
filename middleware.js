import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "bucket-marketing";

// Choose a random bucket
// Optional: contact a 3rd party service to get the user's bucket
const MARKETING_BUCKETS = ["original", "a", "b"];
const getBucket = () =>
  MARKETING_BUCKETS[Math.floor(Math.random() * MARKETING_BUCKETS.length)];

export function middleware(req) {
  console.log("running middleware");
  // Get the bucket cookie
  const bucket = req.cookies[COOKIE_NAME] || getBucket();
  // Proxy to the appropriate variant

  const absoluteUrl = `https://localhost:3000/marketing/${bucket}`;
  console.log(req.nextUrl);
  const res = NextResponse.rewrite(absoluteUrl);

  // Add the bucket to cookies if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookies.set(COOKIE_NAME, bucket); // Use res.cookies.set() to set the cookie
  }

  return res;
}
