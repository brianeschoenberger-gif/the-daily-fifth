import { existsSync, renameSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const command = process.platform === 'win32' ? 'vinext.cmd' : 'vinext';
rmSync('dist', { recursive: true, force: true });
const result = spawnSync(command, ['build'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');

// vinext currently emits prefixed assets into a nested directory on Linux.
// A Pages artifact is already mounted at /<repo>, so normalize _next to the
// artifact root while preserving the public URL prefix embedded in index.html.
const publicPrefix = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(
  /^\/+|\/+$/g,
  '',
);
const rootAssets = join('dist', 'client', '_next');
const nestedAssets = join('dist', 'client', publicPrefix, '_next');
if (publicPrefix && existsSync(nestedAssets)) {
  rmSync(rootAssets, { recursive: true, force: true });
  renameSync(nestedAssets, rootAssets);
}

const staticExportExists = existsSync('dist/client/index.html');
const windowsHandleBug =
  process.platform === 'win32' &&
  result.status !== 0 &&
  staticExportExists &&
  (result.stdout ?? '').includes('Build complete') &&
  (result.stderr ?? '').includes('UV_HANDLE_CLOSING');

if (windowsHandleBug) {
  console.warn(
    '[build] Static export verified; ignored vinext’s post-build Windows libuv shutdown assertion.',
  );
  process.exit(0);
}

if (result.status !== 0 || !staticExportExists) {
  console.error(
    '[build] Static export failed or dist/client/index.html is missing.',
  );
  process.exit(result.status || 1);
}
