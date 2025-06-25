import * as http from "http";

const checkHealth = () => {
  const options = {
    hostname: "localhost",
    port: process.env.USER_SERVICE_PORT || 3001,
    path: "/health",
    method: "GET",
    timeout: 2000,
  };

  const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log("✅ User Service is healthy");
      process.exit(0);
    } else {
      console.log("❌ User Service unhealthy, status:", res.statusCode);
      process.exit(1);
    }
  });

  req.on("error", (err) => {
    console.log("❌ User Service unreachable:", err.message);
    process.exit(1);
  });

  req.on("timeout", () => {
    console.log("❌ User Service timeout");
    req.destroy();
    process.exit(1);
  });

  req.end();
};

checkHealth();
