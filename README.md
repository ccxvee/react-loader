![npm (scoped)](https://img.shields.io/npm/v/@ccxvee/react-loader?style=flat-square)
![npm](https://img.shields.io/npm/dt/@ccxvee/react-loader?style=flat-square)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@ccxvee/react-loader?style=flat-square)
![NPM](https://img.shields.io/npm/l/@ccxvee/react-loader?style=flat-square)

# @ccxvee/react-loader
React component that returns some content depending on the current loading status.

## Installation
```
npm install @ccxvee/react-loader
```

## Usage
```javascript
import React, { useState } from "react";
import { Loader, IDLE, LOADING, SUCCESS, ERROR } from "@ccxvee/react-loader";

function App() {
  const [status, setStatus] = useState(IDLE); //IDLE, LOADING, SUCCESS or ERROR
  
  return (
    <Loader
      status={status}
      idleView={"Waiting for loading"}
      loadingView={<Spinner />}
      errorView={<ErrorView errorMessage={"An error has occurred"} />}
    >
      <SuccessView/>
    </Loader>
  );
}
```
## API

### `Loader` props

#### `status`

This is one of the following string values: `idle`, `loading`, `success`, or `error`.

It is recommended to use predefined constants that can be imported as: 
```javascript 
import { IDLE, LOADING, SUCCESS, ERROR } from "@ccxvee/react-loader";
```
This allows to exclude typos and provide only valid statuses to Loader component.

> If `status` is not valid, `Loader` throws an error.

#### `idleView`

This is everything you want Loader to render when it receives `IDLE` status. 

Default value is `null`.

#### `loadingView`

This is everything you want Loader to render when it receives `LOADING` status.

Default value is `null`.

#### `errorView`

This is everything you want Loader to render when it receives `ERROR` status.

Default value is `null`.

#### `successView`, `children`

This is everything you want Loader to render when it receives `SUCCESS` status.
> You can define only `successView` or `children` prop at the same time. 
> If they are both defined, Loader throws an error.

Default values are `undefined`.
> If `successView` and `children` are both `undefined`, Loader returns `null`.

## Example
```javascript
import React, { useState, useEffect } from "react";
import { Loader, IDLE, LOADING, SUCCESS, ERROR } from "@ccxvee/react-loader";

function ErrorView({ errorMessage, onReload }) {
  return (
    <div>
      {errorMessage}
      <button onClick={onReload}>Try again</button>
    </div>
  );
}

function Spinner() {
  return "beautiful spinner";
}

function NewsFeed({ news }) {
  return (
    <div>
      <h1>News Feed</h1>
      {news.map((post) => (
        <p>post.title, post.content and so on</p>
      ))}
    </div>
  );
}

function NewsApp() {
  const [loaderStatus, setLoaderStatus] = useState(IDLE);
  const [news, setNews] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoaderStatus(LOADING);

    fetch("news")
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error();
      })
      .then((data) => {
        setNews(data);
        setLoaderStatus(SUCCESS);
      })
      .catch(() => {
        setLoaderStatus(ERROR);
        setNews([]);
      });
  }, [reload]);

  function handleReload() {
    setReload((prev) => !prev);
  }

  return (
    <Loader
      status={loaderStatus}
      loadingView={<Spinner />}
      errorView={
        <ErrorView
          errorMessage={"An error has occurred"}
          onReload={handleReload}
        />
      }
      successView={<NewsFeed news={news} />}
    />
  );
}

export default NewsApp;
```
## License
[MIT License](https://github.com/ccxvee/react-loader/blob/master/LICENSE)
