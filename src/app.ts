import { envs } from './config';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  new Server({ port: envs.PORT }).start();
}
