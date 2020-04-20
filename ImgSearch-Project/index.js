const express = require("express")
const app = new express()
const publicFolder = __dirname + "/public"
const { telegramBot, google, port } = require("./config.json")
const badRequest = (message) => ({ status: 400, message })

const fetch = require("node-fetch")

const parameters = {
  url: "https://www.googleapis.com/customsearch/v1?",
  q : "",
  cx: "",
  imgType: "",
  imgColorType: "",
  imgDominantColor: "",
  start : 0,
  num : 10
}

const telegramRequirements = {
  BotName: "@ImgDowloader_bot",
  usrTelegram: "",
  BotToken: ""
}


app.use(require("body-parser").json())
app.use(express.static(publicFolder))

app.post("/search", ({ body: { q, opt }}, res) => {
  const keys = Object.keys(opt)
  if (q && keys.includes("start") && keys.includes("num")) {
    
    Object.keys(opt).includes("imgType" || "imgColorType" || "imgDominantColor")
  } else badRequest("one or more parameters are missing")
  
})

app.post("/tg", ({ body: { user }}, res) => {

})

app.get("/", (req, res) => res.sendFile(publicFolder + "index.html"))

app.all("*", (req, res) => res.sendFile(publicFolder + "index.html"))

app.listen(port, () => console.log(`server listening on port ${port}`))