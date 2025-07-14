const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

// Ruta base (para mantener activo con UptimeRobot)
app.get("/", (req, res) => {
  res.send("🟢 HaxBall server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Web server running on port ${PORT}`);
});

// Lanzar navegador headless y crear la sala
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://www.haxball.com/headless");

  await page.waitForFunction(() => typeof window.HBInit === "function");

  await page.evaluate(() => {
    const room = HBInit({
      roomName: "⚽ Sala Railway",
      maxPlayers: 10,
      public: true,
      noPlayer: true,
      token: "thr1.AAAAAGh0arWfXrqjpJV2wA.XbHIU1iSYg8", // usa tu token
    });

    room.onRoomLink = (link) => {
      console.log("🔗 Link de sala:", link);
    };

    room.onPlayerJoin = (player) => {
      room.sendChat(`¡Bienvenido, ${player.name}! 🎉`);
    };
  });

  console.log("🚀 HaxBall headless iniciado");
})();
