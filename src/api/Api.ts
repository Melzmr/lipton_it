type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  mode: 'cors';
  cache: 'no-cache';
  credentials: 'same-origin';
  headers: Record<string, string>;
  redirect: 'follow';
  referrerPolicy: 'no-referrer';
  body?: string;
};

function getAuthParams() {
  let rParams: any = {};

  location.search
    .slice(1)
    .split('&')
    .forEach((value) => {
      const param = value.split('=');

      rParams = {
        ...rParams,
        [param[0]]: param[1],
      };
    });

  return rParams;
}

export const authParams = getAuthParams();

export const fetchData = async (url = '', method: FetchOptions['method'] = 'GET', data = {}) => {
  let options: FetchOptions = {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify(authParams),
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };

  if (method === 'POST' || method === 'PUT') {
    options = {
      ...options,
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
  }

  const response = await fetch(`https://lipton-it.herokuapp.com/api${url}`, options);

  return response.json(); // parses JSON response into native JavaScript objects
};
