# 德州猫猫酒馆

横屏手机浏览器德州扑克游戏，采用猫咪像素酒馆风格，支持单人 AI 和同一 Wi‑Fi/手机热点下的好友房。游戏不包含现金、充值或兑换功能。

## 在线游玩与安装

在线地址：https://texas-cat-tavern.onrender.com

- Android：使用 Chrome 打开在线地址，选择“安装应用”或“添加到主屏幕”。
- iPhone/iPad：使用 Safari 打开在线地址，点击“分享”，选择“添加到主屏幕”。
- 安装后从桌面打开，并将手机横屏即可游玩。首次打开需要联网加载完整素材。

## 启动

```powershell
npm start
```

电脑访问终端显示的“本机”地址；手机连接同一 Wi‑Fi 或热点后，访问终端显示的“手机”地址。创建房间后把 6 位房间码分享给好友即可。

建议由电脑连接或开启热点并运行游戏服务，其他手机作为玩家加入。Windows 首次运行时如果询问网络访问权限，请允许“专用网络”。

## 测试

```powershell
npm test
```

当前版本支持有效筹码上限、主池/边池、自动下一局、十人桌、随机座位、盲注升级、音效和牌局记录，适合可信好友之间娱乐。

## Cloudflare 免费发布

项目支持 Cloudflare Workers 免费发布：静态游戏资源由 Workers Assets 提供，联机房间由 SQLite Durable Objects 保存。

```powershell
npm install
npm run cloudflare:check
npm run cloudflare:deploy
```

配置位于 `wrangler.jsonc`。部署后，网页、手机主屏幕安装和联机 API 共用同一个 `workers.dev` HTTPS 地址。

## 好友房设置

创建房间前可以选择 2～10 人、头像、初始筹码、盲注和升级时间。真人玩家可在开局前加入；房主开局时，如果人数仍不足，剩余座位会由随机猫咪头像的 AI 玩家补齐。牌桌明确显示按钮位（D）、小盲（SB）和大盲（BB）。
