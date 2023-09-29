
let content;
let pageSelect;
let typeSelect;
let sendButton;

// Parse the response and display its body
const handleResponse = async (response) => {
  switch(response.status) {
    case 200: 
      content.innerHTML = `<b>Success</b>`;
      break;
    case 400: 
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    case 401:
      content.innerHTML = `<b>Unauthorized</b>`;
      break;
    case 403:
      content.innerHTML = `<b>Forbidden</b>`;
      break;
    case 404:
      content.innerHTML = `<b>Resource Not Found</b>`;
      break;
    case 500:
      content.innerHTML = `<b>Internal Server Error</b>`;
      break;
    case 501:
      content.innerHTML = `<b>Not Implemented</b>`;
      break;
    default: 
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }

  // Get the content type and determine how to parse it
  const contentType = response.headers.get('Content-Type');
  
  if(contentType === 'application/json') {
    let obj = await response.json();
    console.log(JSON.stringify(obj));
    content.innerHTML += `<p>Message: ${obj.message}</p>`;
  }
};

// When the buttn is clicked, fetch data from the server
const requestUpdate = async () => {
  const page = pageSelect.value;
  const type = typeSelect.value;
  
  let response = await fetch(page, {
    method: 'GET',
    headers: {
      'Accept': type,
    },
  });
  
  handleResponse(response);
};

// Initialization
const init = () => {
  console.log('client.js loaded');
  
  // Gets the content section
  content = document.querySelector('#content');

  // Get the controls
  pageSelect = document.querySelector("#page");
  typeSelect = document.querySelector("#type");
  sendButton = document.querySelector("#send");
  
  sendButton.onclick = (e) => {
    requestUpdate();
    return false;
  }
};

window.onload = init;
  