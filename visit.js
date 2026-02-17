const puppeteer = require('puppeteer');

(async () => {
  // --- 配置区域 ---
  const targetUrl = 'https://m.tb.cn/h.7CXIKzn?tk=YDcqUM33Z4q';
  const loopCount = 35; // 每次启动刷新 35 次
  // ----------------

  console.log('启动浏览器...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  // 伪装成 iPhone 13 Pro (这是关键，否则闲鱼不认)
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');
  await page.setViewport({ width: 390, height: 844, isMobile: true });

  console.log(`本轮任务目标: 刷新 ${loopCount} 次`);

  try {
    // 第一次加载
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // 开始循环刷新
    for (let i = 1; i <= loopCount; i++) {
      console.log(`[${i}/${loopCount}] 正在刷新页面...`);
      
      // 执行刷新 (reload 比重新 goto 更像真人操作)
      await page.reload({ waitUntil: 'networkidle2', timeout: 60000 });

      // 随机停留 3到6秒 (模拟人看完了一屏，准备看下一屏)
      const sleepTime = Math.floor(Math.random() * 3000) + 3000;
      console.log(`   --> 停留 ${sleepTime}ms`);
      await new Promise(r => setTimeout(r, sleepTime));
    }

  } catch (error) {
    console.error('访问过程中出错:', error.message);
  } finally {
    await browser.close();
    console.log('任务结束，关闭浏览器');
  }
})();
