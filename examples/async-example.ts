// Async example
import { sleep, retry, timeout, withTimeout } from "@mwakidenis/logx";

async function main() {
  // Sleep
  await sleep(100);
  console.log("slept 100ms");

  // Retry
  let attempts = 0;
  const result = await retry(
    async () => {
      attempts += 1;
      if (attempts < 3) throw new Error("not yet");
      return "success";
    },
    { retries: 5, delay: 10 }
  );
  console.log(result); // "success"

  // Timeout
  const fast = await timeout(Promise.resolve("done"), { timeout: 1000 });
  console.log(fast); // "done"

  // withTimeout
  const quick = await withTimeout(async () => "ok", 500);
  console.log(quick); // "ok"
}

main().catch(console.error);
