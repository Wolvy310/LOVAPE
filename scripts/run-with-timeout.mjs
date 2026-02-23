import { spawn } from "node:child_process";

const [, , timeoutSecStr, ...cmd] = process.argv;
const timeoutSec = Number(timeoutSecStr);

if (!timeoutSec || cmd.length === 0) {
  console.error("Usage: node scripts/run-with-timeout.mjs <timeoutSec> <command...>");
  process.exit(2);
}

const child = spawn(cmd[0], cmd.slice(1), { stdio: "inherit", shell: true });

const kill = async () => {
  if (child.killed) return;
  try {
    if (process.platform === "win32") {
      spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "inherit", shell: true });
    } else {
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 2000);
    }
  } catch {}
};

const timer = setTimeout(async () => {
  console.error(`
[timeout] Command exceeded ${timeoutSec}s, killing...
`);
  await kill();
  process.exit(124);
}, timeoutSec * 1000);

child.on("exit", (code) => {
  clearTimeout(timer);
  process.exit(code ?? 1);
});

