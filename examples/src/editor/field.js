export class Field {
    constructor(type, value, ref) {
        this.type = type;
        this.stringValue = type === "string" ? value : "";
        this.numberValue = type === "number" ? value : 0;
        this.listValue = type === "list" ? value : [];
        this.listType = {};
        if (type === "list" && value.length > 0) {
            let v = value[0];
            Object.keys(v).forEach(k => {
                let t = v[k];
                let f = this.listType[k] = new Field(
                    Array.isArray(t) ? "list" : typeof v,
                    t.Array
                );
                f.addRef(ref);
            });
        }
        this.refs = [];
        addRef(ref);
    }
    addRef(ref) {
        if (ref) {
            if (Array.isArray(ref))
                ref.forEach(r => this.refs.push(r));
            else
                this.refs.push(ref);
        }
    }
    removeRef(ref) {
        if (ref) {
            if (Array.isArray(ref))
                ref.forEach(r => this.refs.splice(this.refs.indexOf(r, 1)));
            else
                this.refs.splice(this.refs.indexOf(ref, 1));
        }
    }
    rename(newName) {
        this.refs.forEach(r => r.dynName = newName);
    }
    setValue(value) {
        switch (this.type) {
            case "string":
                this.stringValue = value;
                break;
            case "number":
                this.numberValue = typeof value == "string" ? parseFloat(value) : value;
                break;
            case "list":
                this.listValue = value;
                break;
        }
    }
    getValue() {
        switch (this.type) {
            case "string":
                return this.stringValue;
            case "number":
                return this.numberValue;
            case "list":
                return this.listValue;
        }
    }
}