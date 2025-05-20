case 'ping':
  if (pingInterval) {
    output.innerHTML += 'Ping already running. Type "stop" to stop it.\n';
    break;
  }
  output.innerHTML += 'Starting ping...\n';
  pingInterval = setInterval(() => {
    let ping;
    const rand = Math.random();

    if (rand < 0.8) {
      ping = Math.floor(Math.random() * 10) + 1;           // 1–10 ms
    } else if (rand < 0.98) {
      ping = Math.floor(Math.random() * 490) + 11;         // 11–500 ms
    } else {
      ping = Math.floor(Math.random() * 9500) + 501;       // 501–10000 ms
    }

    output.innerHTML += `Ping: ${ping} ms\n`;
    output.scrollTop = output.scrollHeight;
  }, 100);
  break;
