import { fileURLToPath } from 'node:url';
import {
  cleanBuildOutputDir, writeAssets, writeWorkerConfig, writeRootConfig, readBuildOutput,
} from '@cloudflare/build-output-utils';
import config from '../cloudflare.config.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
await cleanBuildOutputDir(root);
await writeRootConfig(root, { accountId: config.accountId }, { isPreview: false, mode: 'production' });
await writeWorkerConfig({ root, config: config.worker });
await writeAssets({ root, sourceDirectory: fileURLToPath(new URL('../dist/', import.meta.url)) });
await readBuildOutput(root);
console.log('Static site ready for cf deploy --prebuilt.');
