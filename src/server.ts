import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 8080}`);
const BRIGHT = "\x1b[1m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

import app from './app';

app.listen(PORT, () => {
    console.log(`\n${BRIGHT}${GREEN}🚀 Agrofy-API is blazing fast at http://localhost:${PORT}${RESET}\n`)
});