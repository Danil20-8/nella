## Features

- Renders directly to DOM only things that changed
- Builds html in fully declarative javascript style
- Works as you expected in most cases
- Supports custom components
- Supports unlimited store amount including local states
- Tracks store functions call changes and array changes
- Provides component pools
---
## Hello World!

the simplest application

```js
import { mount, div } from "../../uii";

mount(document.body,
    div({ innerText: "Hello World!" })
);
```

now we are using store and adding little interactive

```js
import { useStore, mount, div, switchComponent, button} from "../../uii";

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

 #### The latest features example [withUii.js](./examples/src/withUii.js)

Another examples are obsolet, but they may contain more features wich are not stable yet or removed in last version

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
## Contribution

### What can I do?

- Implement missing html components.
- Implement missing typescript bindings.
- Improve router. I want to make it is like application navigation system and let "back" action for each componet, using routes or not. For example it may allow closing popup or menu on back button, I think it could be great for mobile version.
- Impove infrastructure. Make build utilites for example.
- Make more examples! Any things, components, applications you like!

### Overview

#### [Framework core](./uii.js)

- here is the main code
- this is a "fork" of the [first version of the framework](./index.js). Old version doesn't supports store and has another update mechanism which is not good enough

#### [Store](./shotcard.js)

- here is the store features. Technically it is independent library

#### [TypeScript](./types/uii.ts)

- here is typescript bindings

#### [Router](./router.js)

- here is router

---

## License

[MIT licensed](./license)
