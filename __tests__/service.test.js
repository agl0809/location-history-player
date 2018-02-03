import {service} from 'js/service';

let ready_state, state;
let oldXMLHttpRequest;

function createMockXhr(responseText, readyState, status) {
  const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    overrideMimeType: jest.fn(),
    readyState,
    status,
    responseText
  };

  window.XMLHttpRequest = jest.fn(() => mockXHR);

  return mockXHR;
}

function xmlHttpRequestBackup() {
  oldXMLHttpRequest = window.XMLHttpRequest;
}

function xmlHttpRequestRestore() {
  window.XMLHttpRequest = oldXMLHttpRequest
}

function whenReadFile(fileUrl, xhr) {
  const promise = service(fileUrl);
  xhr.onreadystatechange();

  return promise;
}

describe('making a serviceDep', () => {
  const fileUrl = 'any url';

  beforeEach(function () {
    xmlHttpRequestBackup();
  });

  afterEach(() => {
    xmlHttpRequestRestore();
  });

  it('should return an object with a valid state and the content of a valid json file', (done) => {
    ready_state = 4;
    state = 200;
    const fileContent = {key: 'any content'};
    let promise, xhr;

    xhr = createMockXhr(fileContent, ready_state, state);
    promise = whenReadFile(fileUrl, xhr);

    promise.then((response) => {
      expect(response).toEqual(fileContent);
      done();
    });
  });

  it('should return an error if the file is invalid', (done) => {
    ready_state = 4;
    state = 200;
    const xhrError = {error: 'any error'};
    let promise, xhr;

    xhr = createMockXhr(xhrError, ready_state, state);
    promise = whenReadFile(fileUrl, xhr);

    promise.catch((response) => {
      expect(response).toEqual(xhrError);
      done();
    });
  });
});
