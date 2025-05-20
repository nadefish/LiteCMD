const input = document.getElementById('input');
const output = document.getElementById('output');
let pingInterval = null;

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    output.innerHTML += `> ${command}\n`;
    handleCommand(command.toLowerCase());
    input.value = '';
    output.scrollTop = output.scrollHeight;
  }
});

function handleCommand(cmd) {
  switch (cmd) {
    case 'help':
      output.innerHTML += "Available commands:\nhelp\nhello\ntime\nping\nstop\nclear\n";
      break;
    case 'hello':
      output.innerHTML += "Hi there! 👋\n";
      break;
    case 'time':
      output.innerHTML += new Date().toString() + '\n';
      break;
    case 'ping':
      if (pingInterval) {
        output.innerHTML += 'Ping already running. Type "stop" to stop it.\n';
        break;
      }
      output.innerHTML += 'Starting ping...\n';
      pingInterval = setInterval(async () => {
        const start = performance.now();
        try {
          await fetch("https://www.google.com/favicon.ico", { cache: "no-store" });
          const end = performance.now();
          output.innerHTML += `Ping: ${Math.round(end - start)} ms\n`;
          output.scrollTop = output.scrollHeight;
        } catch (e) {
          output.innerHTML += `Ping failed\n`;
        }
      }, 1); // You may want to use 100ms instead of 1ms for performance
      break;
    case 'stop':
      if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
        output.innerHTML += 'Ping stopped.\n';
      } else {
        output.innerHTML += 'Nothing to stop.\n';
      }
      break;
    case 'clear':
      output.innerHTML = '';
      break;
    default:
      output.innerHTML += `Unknown command: ${cmd}\n`;
  }
}
