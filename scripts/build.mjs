import { existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const command = process.platform === 'win32' ? 'vinext.cmd' : 'vinext';
rmSync('dist', { recursive: true, force: true });
const result = spawnSync(command, ['build'], {
  cwd: process.cwd(),
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');

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
