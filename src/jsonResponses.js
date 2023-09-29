// Write a response and return it to the client
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const getSuccess = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const getBadRequest = (request, response, params) => {
  let responseJSON = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  if (params.valid) {
    responseJSON = {};
    responseJSON.message = 'This request has the required parameters';
    respondJSON(request, response, 200, responseJSON);
    return;
  }

  respondJSON(request, response, 400, responseJSON);
};

const getUnauthorized = (request, response, params) => {
  let responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  if (params.loggedIn === 'yes') {
    responseJSON = {};
    responseJSON.message = 'You have successfully viewed the content';
    respondJSON(request, response, 200, responseJSON);
    return;
  }

  respondJSON(request, response, 401, responseJSON);
};

const getForbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

const getInternalErr = (request, response) => {
  const responseJSON = {
    message: 'Internal server error, something went wrong',
    id: 'internalError',
  };

  respondJSON(request, response, 500, responseJSON);
};

const getNotImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. '
      + 'Check again later for updated content.',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternalErr,
  getNotImplemented,
  notFound,
};
