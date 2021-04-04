// Are we currently logged in?
var isLoggedIn = false

// Upload an upstream (client-to-server) message to KGS.
function uploadKgsMessage() {
  var responseElement = document.getElementById('reqStatus')
  responseElement.innerHTML = '-'

  // In a "real" client, you would build up your message to send programmatically. Here, we just parse the text area
  // into a JSON object.
  var message = JSON.parse(document.getElementById('jsonIn').value)

  var req = new XMLHttpRequest()
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        responseElement.innerHTML = 'OK' // Indicate successful send.
        console.log('Upload success: type = ' + message.type)
        if (message.type == 'LOGIN') {
          // After our login message has been sent, we kick off the first download operation to see the result.
          // After this first download call, each download will automatically trigger the next,
          // so we won't need to call this again.
          isLoggedIn = true
          downloadKgsMessage()
        }
      } else {
        // Upload failed. We'll just report it to the user. This is to help debugging, in a finished client you would
        // want to hide this.
        // The responseText is a big error page from your JSP system, but all KGS error messages have the format
        // ":KGS: error text :KGS:", which makes it easy to extract that with a regex. If the error is in that format,
        // we extract the error; otherwise we show the whole report.
        var errorText = req.responseText
        var matcher = /:KGS: (.*?) :KGS:/.exec(errorText)
        if (matcher) {
          errorText = matcher[1]
        }
        responseElement.innerHTML = req.status + ': ' + errorText
      }
    }
  }
  req.open('POST', 'access', true)
  req.setRequestHeader('content-type', 'application/json;charset=UTF-8') // Make sure Unicode is used.
  req.send(JSON.stringify(message))
}

// Download a downstream (server-to-client) message from KGS. This should be called after our LOGIN message has
// been successfully uploaded.
function downloadKgsMessage() {
  var req = new XMLHttpRequest()
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      var jsonOut = document.getElementById('jsonOut')
      if (req.status == 200) {
        // We have a valid response! Turn it into a javascript object.
        response = JSON.parse(req.responseText)

        // We'll append this message to the HTML to show what came back.
        jsonOut.innerHTML =
          jsonOut.innerHTML +
          '<br>' +
          escapeHtml(JSON.stringify(response, null, 2))

        if (response.messages) {
          // After 1 minute with no message, we'll time out and get an "empty" response. We only want to do the
          // forEach here if the response has content.
          response.messages.forEach(handleMessage)
        }

        if (isLoggedIn) {
          // If we are still logged in, then download another message.
          downloadKgsMessage()
        }
      } else {
        // Show the response as an error message. Don't fetch another message, we're done.
        console.log(
          'Download failure: Status = ' +
            req.status +
            ', response text = ' +
            req.responseText
        )
        jsonOut.innerHTML =
          jsonOut.innerHTML + '<br>' + escapeHtml(req.responseText)
        isLoggedIn = false
      }
    }
  }
  req.open('GET', 'access', true)
  req.send()
}

// We got a message from KGS. For this client, all we do is watch for LOGOUT messages.
function handleMessage(message) {
  console.log('Download success: type = ' + message.type)
  if (message.type == 'LOGOUT') {
    isLoggedIn = false
    if (message.text) {
      alert(message.text)
    }
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
