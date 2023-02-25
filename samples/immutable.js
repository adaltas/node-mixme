import assert from "assert";
import { mutate } from "../lib/index.js";

assert.deepEqual(mutate({ a: "1" }, { b: "2" }), { a: "1", b: "2" });
