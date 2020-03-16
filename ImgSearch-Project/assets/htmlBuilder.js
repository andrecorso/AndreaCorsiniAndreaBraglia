[{ placeholder: "Img type", options: "photo clipart face lineart stock animated" },
  { placeholder: "Img color type", options: "color gray mono" },
  { placeholder: "Img dominant color", options: "black blue brown gray green orange pink purple red teal white yellow"
  }].forEach(({ placeholder, options }) => {
  const container = document.getElementById("options")
  const select = document.createElement("select")
  select.setAttribute("class", "custom-select inputs col")
  const id = placeholder.toLowerCase().split(" ").map((e, i) => !i ? e : e[0].toUpperCase() + e.slice(1)).join("")
  select.setAttribute("id", id)
  const defaultOpt = document.createElement("option")
  defaultOpt.innerHTML = placeholder
  defaultOpt.selected = true
  
  options.split(" ").forEach(e => {
    const opt = document.createElement("option")
    opt.innerHTML = e
    select.appendChild(opt)
  })
  select.appendChild(defaultOpt)
  container.appendChild(select)
})

;["q", "imgType", "imgColorType", "imgDominantColor", "telegram-id"].forEach(id => {
  document.getElementById(id).addEventListener(id === "q" || id === "telegram-id" ? "input" : "change", ({ target: { value } }) => {
    id === "telegram-id" ? telegramRequirements.usrTelegram = value : parameters[id] = value
  })
})

document.querySelector("body").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    event.preventDefault()
    document.getElementById("search-button").click()
  }
})

function toast (msg){
  const x = document.getElementById("snackbar")
  x.className = "show"
  x.innerHTML = msg
  setTimeout(() => {
    x.className = x.className.replace("show", "")
  }, 3000)
}