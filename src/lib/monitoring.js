// monitoring.js – lightweight helper for error tracking and health checks
// If you have a Sentry DSN, set it in an environment variable SENTRY_DSN (add to Vercel env vars).

export function initMonitoring() {
  if (typeof window === "undefined") return; // Only run in browser
  const dsn = process.env.SENTRY_DSN;
  if (dsn) {
    // Dynamically import Sentry to avoid bundling if not used
    import("@sentry/react").then(Sentry => {
      Sentry.init({
        dsn,
        integrations: [],
        tracesSampleRate: 0.1,
      });
      console.log("Sentry monitoring initialized");
    }).catch(err => console.warn("Failed to load Sentry", err));
  } else {
    console.log("SENTRY_DSN not set – error tracking disabled");
  }
}
