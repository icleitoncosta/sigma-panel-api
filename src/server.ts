import "dotenv/config";
import { createServer } from 'http';

import { app } from './app';

const http = createServer(app);


http.listen(process.env.PORT || 9090);

console.log(
    `%c
 _______  ___   _______  __   __  _______ 
|       ||   | |       ||  |_|  ||   _   |
|  _____||   | |    ___||       ||  |_|  |
| |_____ |   | |   | __ |       ||       |
|_____  ||   | |   ||  ||       ||       |
 _____| ||   | |   |_| || ||_|| ||   _   |
|_______||___| |_______||_|   |_||__| |__| 
    `,
    'font-family:Modular'
  );
console.log(`===========================================================`);
console.log(`O servidor está rodando na porta: ${process.env.PORT || 9090}`);
console.log(`===========================================================`);