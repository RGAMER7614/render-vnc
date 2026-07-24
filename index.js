import puppeteer from 'puppeteer';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Koyeb/Render যেন স্লিপ না করায়, সেজন্য সার্ভার চালু রাখা
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
            headless: true, // ব্যাকগ্রাউন্ডে চলবে, কোনো ল্যাগ করবে না
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();
        
        // ভিউপোর্ট সেট করা
        await page.setViewport({ width: 1280, height: 720 });

        console.log("Navigating to Atyro login/dashboard...");
        // তোমার Atyro ড্যাশবোর্ড বা লগইন লিংক এখানে দিবা
        await page.goto('https://atryo.com/login', { waitUntil: 'networkidle2' });

        // যদি অটো লগইন করতে চাও (ইমেল ও পাসওয়ার্ড বসিয়ে দিতে পারো)
        /*
        await page.type('#email', 'YOUR_EMAIL_HERE');
        await page.type('#password', 'YOUR_PASSWORD_HERE');
        await page.click('button[type="submit"]');
        await page.waitForNavigation();
        */

        console.log("Successfully reached Atyro! Maintaining AFK session...");

        // পেজ সচল বা কানেক্টেড রাখার জন্য প্রতি ৪ মিনিট পর পর রিফ্রেশ বা পিং করা
        setInterval(async () => {
            try {
                console.log("Refreshing AFK session to stay active...");
                await page.reload({ waitUntil: 'networkidle2' });
            } catch (err) {
                console.error("Reload error:", err);
            }
        }, 240000); // ৪ মিনিট

    } catch (error) {
        console.error("Bot crashed, restarting in 10 seconds...", error);
        setTimeout(startAFKBot, 10000);
    }
}

startAFKBot();
