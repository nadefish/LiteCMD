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
          // Using a small image file to simulate ping
          await fetch("https://www.google.com/favicon.ico?_=" + Date.now(), { cache: "no-store" });
          const end = performance.now();
          const ping = Math.round(end - start);
          output.innerHTML += `Ping: ${ping} ms\n`;
          output.scrollTop = output.scrollHeight;
        } catch {
          output.innerHTML += `Ping failed\n`;
        }
      }, 100); // 100ms is realistic; 1ms will crash or overload
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
