import puppeteer from 'puppeteer';

async function runBot() {
    try {
        console.log("Launching browser with GUI (VNC mode)...");
        
        const browser = await puppeteer.launch({
            headless: false, // এখন আর ব্যাকগ্রাউন্ডে নয়, স্ক্রিনে দেখা যাবে
            executablePath: '/usr/bin/chromium', // লিনাক্সের ডিফল্ট ক্রোমিয়াম ব্যবহার করবে
            defaultViewport: { width: 1024, height: 768 },
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--start-maximized'
            ]
        });

        const page = await browser.newPage();
        
        // আপনার কাঙ্ক্ষিত ওয়েবসাইট বা গেমের লিংক এখানে বসাবেন
        const targetUrl = 'https://example.com'; 
        console.log(`Navigating to ${targetUrl}...`);
        
        await page.goto(targetUrl, { waitUntil: 'networkidle2' });
        console.log("Page loaded successfully! You can see it on your Render URL.");

        // সংযোগ সচল রাখার জন্য প্রতি ৫ মিনিট পর পর রিফ্রেশ
        setInterval(async () => {
            try {
                console.log("Refreshing page to stay active...");
                await page.reload({ waitUntil: 'networkidle2' });
            } catch (err) {
                console.error("Error during reload:", err);
            }
        }, 300000); 

    } catch (error) {
        console.error("An error occurred in Puppeteer:", error);
        setTimeout(runBot, 5000);
    }
}

runBot();
