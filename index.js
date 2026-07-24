import puppeteer from 'puppeteer';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Render-এর স্লিপ মোড এড়ানোর জন্য ডামি রুট
app.get('/', (req, res) => {
    res.send('Bot is running and active 24/7!');
});

app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT}`);
});

// Puppeteer AFK Bot Logic
async function runBot() {
    try {
        console.log("Launching browser...");
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
        
        // আপনার কাঙ্ক্ষিত ওয়েবসাইট বা লিংক এখানে বসাবেন
        const targetUrl = 'https://example.com'; 
        console.log(`Navigating to ${targetUrl}...`);
        
        await page.goto(targetUrl, { waitUntil: 'networkidle2' });
        console.log("Page loaded successfully! Staying AFK...");

        // সংযোগ সচল রাখার জন্য ইনফিনিট লুপ বা রিফ্রেশ মেকানিজম
        setInterval(async () => {
            try {
                console.log("Refreshing page to stay active...");
                await page.reload({ waitUntil: 'networkidle2' });
            } catch (err) {
                console.error("Error during reload:", err);
            }
        }, 300000); // প্রতি ৫ মিনিট পর পর পেজ রিলোড হবে

    } catch (error) {
        console.error("An error occurred in Puppeteer:", error);
        // ক্র্যাশ করলে ৫ সেকেন্ড পর আবার ট্রাই করবে
        setTimeout(runBot, 5000);
    }
}

runBot();
