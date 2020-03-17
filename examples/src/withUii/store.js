import { useStore } from "../../..";

export const store = useStore({
    name: "rename me",
    langs: ["en", "ru"],
    expirience: [{ name: "cook", age: "3 years" }, { name: "pilot", "age": "1 year" }]
});