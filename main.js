const input = document.getElementById('input');
const output = document.getElementById('output');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const stopBtn = document.getElementById('stopBtn');
let pingInterval = null;

function appendOutput(text) {
  output.innerHTML += text + '\n';
  output.scrollTop = output.scrollHeight;
}

function handleCommand(cmd) {
  switch (cmd) {
    case 'help':
      appendOutput("Available commands:\nhelp\nhello\nhi\ntime\nping\nstop\nclear");
      break;
    case 'hello':
      appendOutput("Hi there! 👋");
      break;
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
      stopBtn.disabled = false;
      pingInterval = setInterval(() => {
        let ping;
        const rand = Math.random();
        if (rand < 0.8) {
          ping = Math.floor(Math.random() * 10) + 1; // 1-10 ms common
        } else if (rand < 0.98) {
          ping = Math.floor(Math.random() * 490) + 11; // 11-500 ms medium
        } else {
          ping = Math.floor(Math.random() * 9500) + 501; // spikes 501-10000 ms
        }
        appendOutput(`Ping: ${ping} ms`);
      }, 100);
      break;
    case 'stop':
      if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
        appendOutput('Ping stopped.');
        stopBtn.disabled = true;
      } else {
        appendOutput('Nothing to stop.');
      }
      break;
    case 'clear':
      output.innerHTML = '';
      break;
    default:
      appendOutput(`Unknown command: ${cmd}`);
  }
}

runBtn.addEventListener('click', () => {
  const command = input.value.trim().toLowerCase();
  if (!command) return;
  appendOutput('> ' + command);
  handleCommand(command);
  input.value = '';
  input.focus();
});

clearBtn.addEventListener('click', () => {
  output.innerHTML = '';
  input.focus();
});

stopBtn.addEventListener('click', () => {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
    appendOutput('Ping stopped.');
    stopBtn.disabled = true;
  }
  input.focus();
});

// Optional: run command on Enter key in input
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    runBtn.click();
  }
});

// Initial welcome message
appendOutput("Hi! Welcome to LiteCMD.\nType 'help' to see commands.");
stopBtn.disabled = true;
input.focus();
