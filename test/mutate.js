import should from "should";
import { mutate } from "../lib/index.js";

describe("mutate", () => {
  describe("mutation", () => {
    it("enrich 1st object", () => {
      const obj1 = {
        a: "a value",
        b: "b value",
        c: { d: "d value", f: "f value" },
      };
      const obj2 = { b: "b new", c: { d: "d new" } };
      mutate(obj1, obj2).should.eql({
        a: "a value",
        b: "b new",
        c: { d: "d new", f: "f value" },
      });
    });

    it("null prototype", () => {
      const obj1 = Object.create(null);
      obj1.a = "a value";
      obj1.b = "b value";
      obj1.c = { d: "d value", f: "f value" };
      const obj2 = { b: "b new", c: { d: "d new" } };
      mutate(obj1, obj2);
      should.not.exists(Object.getPrototypeOf(obj1));
      ({ ...obj1 }.should.eql({
        a: "a value",
        b: "b new",
        c: { d: "d new", f: "f value" },
      }));
    });

    it("dont merge proto", () => {
      const src = {};
      mutate(src, JSON.parse('{"__proto__": {"polluted": "ohno"}}'));
      const obj = Object.create({});
      should.not.exists(obj.polluted);
    });
  });

  describe("2nd arg not object", () => {
    it("object with string", () => {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = "b";
      mutate(obj1, obj2).should.eql("b");
    });

    it("object with undefined", () => {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = undefined;
      mutate(obj1, obj2).should.eql({ a_key: "a value", b_key: "b value" });
    });

    it("object with null", () => {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = null;
      should.not.exists(mutate(obj1, obj2));
    });
  });

  describe("2nd arg object", () => {
    it("is immutable", () => {
      const source = { a_key: "a value", b_key: "b value" };
      const result = mutate(null, source);
      source.a_key = "new value";
      result.a_key.should.eql("a value");
    });

    it("object with object", () => {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = { b_key: "new b value" };
      mutate(obj1, obj2).b_key.should.eql("new b value");
    });

    it("object with null", () => {
      const obj1 = { a: { b: "1" } };
      const obj2 = { a: { b: null } };
      mutate(obj1, obj2).should.eql({ a: { b: null } });
    });

    it("object with undefined", () => {
      const obj1 = { a: { b: "1" } };
      const obj2 = { a: { b: undefined } };
      mutate(obj1, obj2).should.eql({ a: { b: "1" } });
    });

    it("avoid infinite loop", () => {
      const obj1 = { a_key: { b_key: "b value" } };
      const obj2 = obj1;
      mutate(obj1, obj2);
      obj1.a_key.b_key.should.eql("b value");
    });

    it("overwrite regexp value", () => {
      const obj1 = { a: /.*/gm, b: { c: /.*/ } };
      const obj2 = { b: { c: /^.*$/ } };
      mutate(obj1, obj2).should.eql({ a: /.*/gm, b: { c: /^.*$/ } });
    });

    it("buffer with buffer", () => {
      const obj1 = { a_key: Buffer.from("abc") };
      const obj2 = { a_key: Buffer.from("def") };
      mutate(obj1, obj2).a_key.toString().should.eql("def");
    });

    it("string with string", () => {
      const obj1 = { a_key: "abc" };
      const obj2 = { a_key: "def" };
      mutate(obj1, obj2).a_key.should.eql("def");
    });

    it("array with object", () => {
      const obj1 = ["a", "b"];
      const obj2 = { a: "1", b: "2" };
      mutate(obj1, obj2).should.eql({ a: "1", b: "2" });
    });
  });

  describe("array", () => {
    it("reference array in first argument", () => {
      const obj1 = { a: [1, 2], b: [3, 4] };
      const obj2 = { b: [5, 6] };
      const res = mutate(obj1, obj2);
      res.should.eql({ a: [1, 2], b: [5, 6] });
      obj1.a.shift();
      res.should.eql({ a: [2], b: [5, 6] });
    });

    it("copy array in following argument", () => {
      const obj1 = { a: [1, 2], b: [3, 4] };
      const obj2 = { b: [5, 6] };
      const obj3 = { c: [7, 8] };
      const res = mutate(obj1, obj2, obj3);
      res.should.eql({ a: [1, 2], b: [5, 6], c: [7, 8] });
      obj2.b.shift();
      obj3.c.shift();
      res.should.eql({ a: [1, 2], b: [5, 6], c: [7, 8] });
    });

    it("array elements are cloned", () => {
      const obj1 = { a: null };
      const obj2 = { a: [{ b: { c: 3, d: 4 } }] };
      const res = mutate(obj1, obj2);
      obj2.a[0].b.c = 5;
      res.should.eql({ a: [{ b: { c: 3, d: 4 } }] });
    });
  });
});
