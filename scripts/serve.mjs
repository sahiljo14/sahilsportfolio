import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve("out");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (prefix && (pathname === "/" || pathname === prefix)) {
      res.writeHead(302, { Location: `${prefix}/` });
      res.end();
      return;
    }
    if (prefix && !pathname.startsWith(`${prefix}/`))
      throw new Error("Outside base path");
    let file = resolve(root, `.${pathname.slice(prefix.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`))
      throw new Error("Outside static root");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const data = await readFile(file);
    const encoding = (req.headers["accept-encoding"] ?? "")
      .split(",")
      .find((value) => value.split(";")[0].trim() === "gzip");
    const gzip =
      encoding &&
      !/;\s*q=0(?:\.0*)?(?:\s*;|\s*$)/.test(encoding) &&
      [".html", ".css", ".js", ".json", ".txt", ".xml", ".svg"].includes(
        extname(file),
      );
    res.writeHead(200, {
      "Content-Type": types[extname(file)] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      Vary: "Accept-Encoding",
      ...(gzip ? { "Content-Encoding": "gzip" } : {}),
    });
    res.end(req.method === "HEAD" ? undefined : gzip ? gzipSync(data) : data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      await readFile(resolve(root, "404.html")).catch(
        () => "Build the portfolio with npm run build first.",
      ),
    );
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Portfolio preview: http://127.0.0.1:${port}${prefix}/`),
);
