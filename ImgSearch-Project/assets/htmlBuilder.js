[{ placeholder: "Type", options: "photo clipart face lineart stock animated" },
  { placeholder: "Color type", options: "color gray mono" },
  { placeholder: "Dominant color", options: "black blue brown gray green orange pink purple red teal white yellow" }
].forEach(({ placeholder, options }) => {
  const container = document.getElementById("options")
  
  const id = placeholder.toLowerCase().split(" ").join("-")
  
  const select = document.createElement("select")
  select.setAttribute("class", "custom-select inputs col")
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

;["q", "type", "color-type", "dominant-color", "telegram-id"].forEach(id => {
  document.getElementById(id).addEventListener(id === "q" || id === "telegram-id" ? "input" : "change", ({ target: { value } }) => {
    id === "telegram-id" ? telegramRequirements.usrTelegram = value  : parameters[id] = value
    if (id === "q") parameters.start = 10
  })
})

document.querySelector("body").addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    document.getElementById("search-button").click()
  }
})