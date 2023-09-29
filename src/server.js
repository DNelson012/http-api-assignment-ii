const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// All the URL handlers
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/client.js': htmlHandler.getScript,
    '/success': jsonHandler.getSuccess,
    '/badRequest': jsonHandler.getBadRequest,
    '/unauthorized': jsonHandler.getUnauthorized,
    '/forbidden': jsonHandler.getForbidden,
    '/internal': jsonHandler.getInternalErr,
    '/notImplemented': jsonHandler.getNotImplemented,
    '/notFound': jsonHandler.notFound,
    notFound: jsonHandler.notFound,
  },
};

// Handle requests
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  //const acceptedTypes = request.headers.accept.split(',');

  // Use the JSON/HTML handler to handle the request
  if (urlStruct.GET[parsedUrl.pathname]) {
    return urlStruct.GET[parsedUrl.pathname](request, response, params);
  }

  // If there is no matching URL, return nothing found (JSON)
  return urlStruct.GET.notFound(request, response);
};

// Start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
