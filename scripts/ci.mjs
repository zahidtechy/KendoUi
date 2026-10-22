import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: true });
    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} failed (${signal ?? code})`));
    });
  });
}

async function hasSpecs(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return false;
  }

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (await hasSpecs(fullPath)) {
        return true;
      }
    } else if (entry.name.endsWith('.spec.ts')) {
      return true;
    }
  }

  return false;
}

async function main() {
  if (process.env.KENDO_UI_LICENSE) {
    await run('npx', ['kendo-ui-license', 'activate']);
  } else {
    console.log('KENDO_UI_LICENSE is not set. The production build keeps the Kendo trial watermark.');
  }

  if (await hasSpecs('src')) {
    await run('npm', ['run', 'test:ci']);
  } else {
    console.log('No unit tests found under src. Skipping Karma.');
  }

  await run('npm', ['run', 'build:ci']);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
