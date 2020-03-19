# Nella

is a framework for building UI for web applications

## is

- ### [Declarative UI components](#Components)
- ### [Reactive store](#Store)
- ### [State machine router](#Router)

---

## Get ready

### install

```sh
npm install nella
```

### import nella

```js
import { useStore, mount, div, switchComponent, button } from "nella";
...
```

### add store

```js
const store = useStore({
  hello: false
});
...
```

### mount entry point

```js

mount(document.body, ...
```

### add components

```js
[
  switchComponent({
    active: store.hello,
    component: () => div({ innerText: "Hello World!" })
  }),
  button({
    innerText: "say hello",
    onclick: () => (store.hello = true)
  })
]...
```

### done!

```js
import { useStore, mount, div, switchComponent, button } from "nella";

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
    onclick: () => (store.hello = true)
  })
]);
```

---

## Dive

### Components

Nella implements components for default html elements such as div, input, iframe

```js
import { div, inputText, iframe } from "nella";

div({ ... /* html element properties and event listeners */ }, ... /* child components */);
inputText({ ... });
iframe({ ... }, ... );
```

and provides special components for dynamic parts of an application

```js
import { list, switchComponent, poolList, poolSwitch } from "nella";

list({
    data: ... //list of your items,
    component: (item) => ... // your component
});

switchComponent(
    {
        active: () => ... // predicate: should render?,
        component: () => ... // your component
    },
    {
        active: () => ...,
        component: () => ...
    },
    ...
);

// provide pool for your dynamic components

poolList({
    data: ... //list of your items,
    component: (item /* proxy on your item */ ) => ... // your component
});

poolSwitch(
    {
        active: () => ... // predicate: should render?,
        component: () => ... // your component
    },
    {
        active: () => ...,
        component: () => ...
    },
    ...
);
```

### Store
store initialization
```js
import { useStore, NStore } from "nella";

let store = useStore({
    ... // your properties and functions
}); // store is proxy, and all its properties are proxies too

store.name = "nella"; // name observers will be updated on update action

store.name === "nella"; // false, because name is proxy object, not a string
store.name.valueOf() === "nella"; // true, store properties have overridden valueOf and toString methods to get their original values

class Store extends NStore{
    constructor(){
        super();
        ... // properties initialization
    }

    ... // functions
}

```
forse update nella
```js
import { updateN } from "nella";

updateN(); // update all targets whose properties was changed
// the same method called on all html element event triggers and on window popstate
```
custom store tracking
```js
import { NTarget } from "nella";
import { store } from "mystore"; // import your store

let target = new NTarget{[
    () => console.log(`hello ${store.name}`), // tracking action, called as store name has been changed
    {
        tracking: () => `hello ${store.name}`, // tracking action, returns some result
        postaction: (greetings /* tracking action result */ ) => console.log(greetings) // untracking action, called after tracking action
    },
    ...
]}

target.track(); // start tracking
target.untrack(); // stop tracking
```
### Router
implement pages
```js
import { switchComponent } from "nella";
import { router } from "nella/router";

switchComponent({
    active: () => router.pathname.valueOf() === "/home",
    component: () => ...
})


router.pushState(null, "/home", {});
```
implement state transitions
```js
import { NRoute, router } from "nella/router";

class MyRoute extends NRoute{
    constructor(){
        super("routeKey"); // route key to support transitions after page reloading
    }

    handleEnter(state){...} // called when enter the route
    handlePushEnter(state){...} // called when enter the route by pushState or history forwarding
    handlePopEnter(state){...} // called when enter the route by popState or history back

    handleExit(){...} // called when exit the route
    handlePushExit(){...} // called when exit the route by pushState or history forwarding
    handlePopExit(){...} // called when exit the route by popState or history back
}

let route = new MyRoute();

router.pushState(null /* state */, null /* url */, route); // handleEnter and handlePushEnter of the route will be called
router.pushState(null /* state */, null /* url */, route); // handleExit and handlePushExit of the route will be called
// and then handleEnter and handlePushEnter of the route will be called
router.popState(); // handleExit and handlePopExit of the route will be called
// and then handleEnter and handlePopEnter of the route will be called
```
---

## License

[MIT licensed](./license)
