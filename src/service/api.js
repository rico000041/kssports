import "abortcontroller-polyfill";
import qs from "qs";

const baseURL = "https://u2daszapp.u2d8899.com/";
// const baseURL = 'https://sghsrthth9i9.u2d12345.com/';

function request(method, path, data, params = {}) {
  let is_aborted = false;

  const AbortController = window.AbortController;
  const controller = new AbortController();
  const signal = controller.signal
  console.log(data)
  const promise = new Promise((resolve, reject) => {
    let url = `${baseURL}${path}`;

    let req = {
      method,
      headers: {},
      signal
    };

    if (data && Object.keys(data).length && method === "get") {
      url += `?${qs.stringify(data)}`;
    }
    
    if (data && Object.keys(data).length && method === "post") {
      // req.body = JSON.stringify(data);
      // req.headers['Content-Type'] = 'application/json; charset=utf-8';
      if (data.type === "upload_pictures") {
        req.body = data.body;
      } else {
        req.body = qs.stringify(data, { arrayFormat: 'index', encode: false });
        req.headers["Content-Type"] =
          "application/x-www-form-urlencoded; charset=utf-8";
      }
    }
    console.log(req.body)
    fetch(url, req).then(
      (r) => {
        r.json().then(
          (r) => {
            if (+r.status !== 1) {
              return void (params.fail
                ? params.fail(r.info, reject, resolve)
                : reject(r.info || r.message));
            }

            params.done ? params.done(r, resolve, reject) : resolve(r);
          },
          (e) => {
            const error = {
              is_aborted,
              level: 1,
              e,
            };

            params.fail ? params.fail(error, reject) : reject(error);
          }
        );
      },
      (e) => {
        const error = {
          is_aborted,
          level: 0,
          e,
        };

        params.fail ? params.fail(error, reject) : reject(error);
      }
    );
  });

  return {
    promise,
    cancel: () => {
      is_aborted = true;

      controller.abort();
    },
  };
}

const methods = {
  request,
  get: (path, data, params) => request("get", path, data, params),
  post: (path, data, params) => request("post", path, data, params),
}

export default methods;
