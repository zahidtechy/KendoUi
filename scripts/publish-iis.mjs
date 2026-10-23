import { access, cp, copyFile, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'dist', 'kendo-ui', 'browser');
const destination = 'E:\\Personal\\Release';

await access(join(source, 'index.html'));
await mkdir(destination, { recursive: true });

const entries = await readdir(destination);
for (const entry of entries) {
  await rm(join(destination, entry), { recursive: true, force: true });
}

await cp(source, destination, { recursive: true });
await copyFile(join(root, 'iis', 'web.config'), join(destination, 'web.config'));

console.log(`Published IIS release to ${destination}`);
