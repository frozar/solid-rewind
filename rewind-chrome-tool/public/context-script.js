/* global chrome */

// listens for messages from app / current page tab
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source !== window) return;
  
  if (event.data.type && (event.data.type === "FROM_PAGE")) {
      console.log("content-script.js received: " + event.data.text);
      sendMessageToDevTool(event.data);
  }
});

// pass message along to dev tool
const sendMessageToDevTool = async ( message ) => {
  console.log("sending message to dev tool:", message);
  chrome.runtime.sendMessage({...message});
  // got rid of await, was returning promise erros
  //const response = await chrome.runtime.sendMessage({...message});

  // do something with response here, not outside the function ??
  //console.log(response);
}

// sends message to window.
chrome.runtime.connect().onMessage.addListener(function(message, sender, sendResponse){
  console.log('in context script', message)
  console.log("sending from context-script.js -- B")
  sendReplayToAppWeAreDebugging(message.reply)
});

function sendReplayToAppWeAreDebugging(msg) {
  console.log('post to window from context-script.js')
  let data = { type: "FROM_DEVTOOL", text: msg };
  window.postMessage(data, "*");
}
