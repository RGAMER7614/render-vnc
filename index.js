import puppeteer from 'puppeteer';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Atyro AFK Bot is running 24/7 in background!');
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

async function startAFKBot() {
    try {
        console.log("Launching background browser...");
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        console.log("Navigating to Atyro...");
        await page.goto('https://atryo.com/', { waitUntil: 'networkidle2' });

        console.log("AFK bot is active and maintaining connection...");

        // প্রতি ৪ মিনিট পর পর পেজ রিফ্রেশ করে সেশন সচল রাখা
        setInterval(async () => {
            try {
                console.log("Refreshing session to stay active...");
                await page.reload({ waitUntil: 'networkidle2' });
            } catch (err) {
                console.error("Reload error:", err);
            }
        }, 240000);

    } catch (error) {
        console.error("An error occurred, restarting bot...", error);
        setTimeout(startAFKBot, 10000);
    }
}

startAFKBot();
