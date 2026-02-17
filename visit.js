const puppeteer = require('puppeteer');

(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({
    headless: "new", // 无头模式
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  // 关键：伪装成 iPhone 13 Pro
  // 如果不伪装，闲鱼会看到 "HeadlessChrome"，直接拦截
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');

  // 设置视口大小（手机屏幕）
  await page.setViewport({ width: 390, height: 844, isMobile: true });

  console.log('正在访问闲鱼页面...');
  
  try {
    // 你的闲鱼链接
    await page.goto('https://m.tb.cn/h.7CXIKzn?tk=YDcqUM33Z4q', {
      waitUntil: 'networkidle2', // 等待网络空闲（即JS加载完毕）
      timeout: 30000 
    });

    console.log('页面加载完成');

    // 随机停留 5-10 秒
    const sleepTime = Math.floor(Math.random() * 5000) + 5000;
    console.log(`模拟浏览停留: ${sleepTime}ms`);
    await new Promise(r => setTimeout(r, sleepTime));

    // 可以选择截图看看效果（在 Actions 的 Artifacts 里能看到，这里仅打印）
    // await page.screenshot({ path: 'xianyu.png' });

  } catch (error) {
    console.error('访问出错:', error);
  } finally {
    await browser.close();
    console.log('浏览器已关闭');
  }
})();
