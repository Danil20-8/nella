import * as ll from "./";

export function createElement(tag, attributes, ...children) {
    attributes = attributes || {};
    let component = ll[tag];
    if (component) {
        if (component === ll.switchComponent || component === ll.poolSwitch) {
            return component(...children);
        }
        if (component === ll.list || component === ll.poolList) {
            if (!attributes.component)
                attributes.component = children[0];
            return component(attributes);
        }

        return component(attributes, ...children);
    }
    else if (tag instanceof Function) {
        return new tag(attributes, ...children);
    }
    
    return new ll.Component(attributes, tag, children);
}

export function Fragment(...children) {
    return children;
}