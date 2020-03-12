## Features

- Renders directly to DOM only things that changed
- Builds html in fully declarative javascript style
- Works as you expected in most cases
- Supports custom components
- Supports unlimited store amount including local states
- Tracks store functions call changes and array changes
- Provides component pools

Nella uses Proxy for its store so it works only on modern browsers: Firefox, Chrome, Edge...

---
## Installing
```sh
npm install nella
```
## Hello World!

the simplest application

```js
import { mount, div } from "nella";

mount(document.body,
    div({ innerText: "Hello World!" })
);
```

now we are using store and adding little interactive

```js
import { useStore, mount, div, switchComponent, button} from "nella";

let store = useStore({
  hello: false
});

mount(document.body, [
  switchComponent({
    active: store.hello,
    component: () => div({ innerText: "Hello World!" })
  }),
  button({
    innerText: "say hello",
    onclick: () => store.hello = true
  })
]);
```

## More examples

The latest features example [withUii.js](./examples/src/withUii.js)

To build examples go to ./examples directore and run

```sh
npx webpack
```

then follow to ./examples/dist directory and run

```sh
python -m SimpleHTTPServer 9000
```

and open "http://localhost:9000" in browser
or just open "index.html" file

---

## License

[MIT licensed](./license)
