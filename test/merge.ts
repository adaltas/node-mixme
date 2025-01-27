import should from "should";
import { merge } from "../src/index.js";

describe("mixme.merge", function () {
  it("does not alter arguments", function () {
    const obj1 = { a: 1, b: 2, c: 0 };
    const obj2 = { a: 1, c: 3, d: 4 };
    merge(obj1, obj2).should.eql({ a: 1, b: 2, c: 3, d: 4 });
    obj1.should.eql({ a: 1, b: 2, c: 0 });
    obj2.should.eql({ a: 1, c: 3, d: 4 });
  });

  it("null prototype", function () {
    const obj1 = Object.create(null);
    obj1.a = 1;
    obj1.b = 2;
    obj1.c = 0;
    const obj2 = { a: 1, c: 3, d: 4 };
    merge(obj1, obj2).should.eql({ a: 1, b: 2, c: 3, d: 4 });
    ({ ...obj1 }).should.eql({ a: 1, b: 2, c: 0 });
    obj2.should.eql({ a: 1, c: 3, d: 4 });
  });

  it("dont merge proto", function () {
    merge({}, JSON.parse('{"__proto__": {"polluted": "ohno"}}'));
    const obj = Object.create({});
    should(obj.polluted).be.Undefined();
  });

  it("generic interface matching", function () {
    interface Test {
      a?: string;
      b?: string;
    }
    interface Result {
      a: string;
      b: string;
    }
    const test: Test = {
      b: "A",
    };
    const res: Result = merge<Test[]>({ b: "B" }, test);
    res.should.eql({ b: "A" });
  });
});
