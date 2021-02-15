const { spawn } = require('child_process');

spawn('cd dist && npm publish', { stdio: 'inherit', shell: true });
