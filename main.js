window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  let pingInterval = null;

  function appendOutput(text) {
    output.innerHTML += text + '\n';
    output.scrollTop = output.scrollHeight;
  }

  // Secure random BigInt in range [0, max)
  function getSecureRandomBigInt(max) {
    const bits = max.toString(2).length;
    const bytes = Math.ceil(bits / 8);
    let rand;

    do {
      const buffer = new Uint8Array(bytes);
      crypto.getRandomValues(buffer);
      rand = 0n;
      for (let byte of buffer) {
        rand = (rand << 8n) + BigInt(byte);
      }
    } while (rand >= max);

    return rand;
  }

  function handleCommand(cmd) {
    const args = cmd.trim().split(" ");
    const baseCmd = args[0].toLowerCase();

    switch (baseCmd) {
      case 'help':
        appendOutput("Available commands:\nhelp\nhello\nhi\ntime\nping\nstop\nclear\nrandom [min] [max]");
        break;

      case 'hello':
      case 'hi':
        appendOutput("Hey there! 👋");
        break;

      case 'time':
        appendOutput(new Date().toString());
        break;

      case 'ping':
        if (pingInterval) {
          appendOutput('Ping already running. Type "stop" to stop it.');
          break;
        }
        appendOutput('Starting ping...');
        pingInterval = setInterval(() => {
          let ping;
          const rand = Math.random();
          if (rand < 0.8) {
            ping = Math.floor(Math.random() * 10) + 1;
          } else if (rand < 0.98) {
            ping = Math.floor(Math.random() * 490) + 11;
          } else {
            ping = Math.floor(Math.random() * 9500) + 501;
          }
          appendOutput(`Ping: ${ping} ms`);
        }, 100);
        break;

      case 'stop':
        if (pingInterval) {
          clearInterval(pingInterval);
          pingInterval = null;
          appendOutput('Ping stopped.');
        } else {
          appendOutput('Nothing to stop.');
        }
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      case 'random': {
        let min = 1n;
        let max = 10000000000000000000000000000000000000n; // 10^40

        if (args.length === 3) {
          try {
            min = BigInt(args[1]);
            max = BigInt(args[2]);
            if (min > max) {
              appendOutput('Invalid range. Usage: random [min] [max]');
              break;
            }
          } catch {
            appendOutput('Invalid numbers. Use whole numbers only.');
            break;
          }
        }

        const range = max - min + 1n;
        const rand = min + getSecureRandomBigInt(range);
        appendOutput(`Random number: ${rand}`);
        break;
      }

      default:
        appendOutput(`Unknown command: ${cmd}`);
    }
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      if (!command) return;
      appendOutput('> ' + command);
      handleCommand(command);
      input.value = '';
    }
  });

  appendOutput("Welcome to LiteCMD 👋");
  appendOutput("Type 'help' to see available commands.");
  appendOutput("──────────────\n");
});
