import puppeteer from 'puppeteer';

async function runBot() {
    try {
        console.log("Launching browser with GUI (VNC mode)...");
        
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/usr/bin/chromium',
            defaultViewport: { width: 800, height: 600 },
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-zygote',
                '--disable-gpu'
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
