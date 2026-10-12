import fs from "node:fs";
import path from "node:path";

/** Path of a /public asset on disk, e.g. "/images/landing/hero.png". */
function publicPath(src: string) {
  return path.join(process.cwd(), "public", src);
}

export function publicFileExists(src: string) {
  return fs.existsSync(publicPath(src));
}

/** Width and height of a PNG in /public, read from its header. Null if missing or not a PNG. */
export function pngSize(src: string): { width: number; height: number } | null {
  try {
    const fd = fs.openSync(publicPath(src), "r");
    const header = Buffer.alloc(24);
    fs.readSync(fd, header, 0, 24, 0);
    fs.closeSync(fd);
    if (header.toString("ascii", 12, 16) !== "IHDR") return null;
    return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
  } catch {
    return null;
  }
}
