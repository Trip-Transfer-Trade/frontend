import fs from 'fs';
import fetch from 'node-fetch';

async function isValidImageUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function generateStockLogo(stockCodes) {
    const StockLogo = [];

    await Promise.all(stockCodes.map(async (stockCode) => {
        const logoUrl = `https://static.toss.im/png-icons/securities/icn-sec-fill-${stockCode}.png`;
        if (await isValidImageUrl(logoUrl)) {
            StockLogo.push({ stockCode, logoImageUrl: logoUrl });
        }
    }));

    if (StockLogo.length > 0) {
        fs.writeFileSync('StockLogo.json', JSON.stringify(StockLogo, null, 2));
        console.log("StockLogo.json 파일이 생성되었습니다!");
    }

    return StockLogo;
}

const stockCodes = [
   "RIBB", "CEPO", "BTSGU", "YOKE", "CUB", "SWVLW", "LSEAW", "MMLP", "ALVOW", "IVCA"

];

generateStockLogo(stockCodes).then(stockLogoData => {
    console.log("생성된 StockLogo 데이터:", stockLogoData);
});
