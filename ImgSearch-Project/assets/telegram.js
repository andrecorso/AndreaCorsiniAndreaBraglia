function sendMessage(id, caption, photo) {
  fetch(`https://api.telegram.org/bot${telegramRequirements.BotToken}/sendPhoto?chat_id=${id}&photo=${photo}&caption=${caption}`)
    .then(({ status }) => {
      status === 200? toast(`Img sent on @${telegramRequirements.usrTelegram} chat`) : toast("Sorry, img can't be sent the link is bad formed")
    })
    .catch(err => console.log(err))
}

function idFind (caption, photo) {
  let isStarted = false
  fetch(`https://api.telegram.org/bot${telegramRequirements.BotToken}/getUpdates`)
    .then(res => res.json())
    .then(({ result }) => {
      result.forEach(({ message:{ from : { username, id } } }) => {
        if (username === telegramRequirements.usrTelegram) {
          sendMessage(id, caption, photo)
          isStarted = true
        }
      })
      !isStarted ? toast(`You don"t have activated the Bot plase write /start\n in ${telegramRequirements.BotName}`) : false
    })
    .catch(err => toast(err))
}