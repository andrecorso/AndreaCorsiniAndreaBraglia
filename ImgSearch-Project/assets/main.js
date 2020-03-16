function loadClient() {
  gapi.load("client")
}

function checkParam () {
  !parameters.q ? toast("Please insert any key words in the search bar") : false
  ;[{ placeholder: "imgType", options: "photo clipart face lineart stock animated" },
    { placeholder: "imgColorType", options: "color gray mono" },
    { placeholder: "imgDominantColor", options: "black blue brown gray green orange pink purple red teal white yellow"
    }].forEach(({ placeholder, options }) => {
    const trusted = options.split(" ").filter(opt => parameters[placeholder] === opt ? opt : "").join("")
    parameters[placeholder] = trusted
  })
}

function start() {
  if (!parameters.q) {
    toast("Please insert any key words in the search bar")
  } else {
    checkParam()
    const link = Object.keys(parameters).map(e => {
      if (e === "url") {
        return parameters[e]
      } else if (parameters[e] || parameters[e] === 0) {
        return `${e}=${parameters[e]}`
      }
    }).filter(e => e ? e : false).join("&")
    
    gapi.client.init({
      apiKey: "AIzaSyAo9gkEfAevl6Ct2rko7NyKA24sd6oRNCI"
    }).then(function() {
      return gapi.client.request({
        path: link
      })
    }).then((response) => {
      parameters.start += 11
      paginator(response.result.items)
    }, (reason) => {
      console.log(reason.result.error.message)
    })
  }
  
}


function paginator (items) {
  const container = document.getElementById("container")
  
  items.forEach(({ title, image: { contextLink }, displayLink, link }) => {
    const el = []
    ;[{ name: "cardDiv", element: "div", attribute: { class : "card rounded mb-3" } },
      { element: "img", attribute: { src : link, alt: "..." } },
      { name: "cardBody", element: "div", attribute: { class : "card-body" } },
      { element: "h5", attribute: { class : "card-title", innerText: title } },
      { element: "p", attribute: { class: "card-text", innerText: "Domain: " + contextLink } },
      { element: "button", attribute: { class: "rounded tl-button", type: "submit", onclick: `idFind("${displayLink}", "${link}")`, innerText: "Send Img with telegram" }
      }].forEach((e, i, arr) => {
      const x = document.createElement(e.element)
      
      Object.keys(e.attribute).forEach(e => {
        if (e === "innerText") {
          x.innerHTML = arr[i].attribute.innerText
        } else {
          x.setAttribute(e, arr[i].attribute[e])
        }
      })
      const z = {
        name: e.name ? e.name : e.element,
        element: x
      }
      el.push(z)
    })
    
    ;[{ container:"cardBody", child: ["h5", "p", "button"] },
      { container: "cardDiv", child: ["img", "cardBody"]
      }].forEach(({ container, child }) => {
      child.forEach(e => {
        const cont = el.filter(x => x.name === container)[0]
        const ch = el.filter(x => x.name === e)[0]
        el[el.indexOf(cont)].element.appendChild(ch.element)
      })
      
    })
    container.appendChild(el[0].element)
  })
}

