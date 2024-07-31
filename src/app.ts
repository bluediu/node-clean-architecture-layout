import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  new Server({}).start();
}
