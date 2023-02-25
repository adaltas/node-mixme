import assert from "assert";
import { mutate } from "../lib/index.js";

const obj = { a: "1" };
mutate(obj, { b: "2" });

assert.deepEqual(obj, { a: "1", b: "2" });
