# 積股成多 - 股票機器人
透過 line 獲取股票資訊，並具有追蹤功能，當股票的收盤價或殖利率到達指定的追蹤價格，機器人便會提醒

+ 查詢股票資訊
![image](https://github.com/Rubyrubylai/stock-bot/blob/master/liff.jpg)

+ 股票追蹤選單
![image](https://github.com/Rubyrubylai/stock-bot/blob/master/message.jpg)

## 環境
+ Node.js v10.15.0

# 安裝
1. 開啟終端機(Terminal)，cd到存放專案本機位置並執行:
```
git clone https://github.com/Rubyrubylai/stock-bot.git
```
2. 在 stock-bot 資料夾中安裝套件
```
cd stock-bot
npm install
```
4. 創建 .env 資料夾
```
touch .env
```
5. 在 .env 資料夾中寫入以下
```
CAHNNEL_ID=
CHANNEL_SECRET=
CHANNEL_ACCESS_TOKEN=
follow_liffId=
list_liffId=
```
6. 新建資料庫
```
npx sequelize db:migrate
```
7. 執行專案
```
npm run dev
```