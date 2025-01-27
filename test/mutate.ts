import should from "should";
import { mutate } from "../src/index.js";

describe("mutate", function () {
  describe("mutation", function () {
    it("enrich 1st object", function () {
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

    it("null prototype", function () {
      const obj1 = Object.create(null);
      obj1.a = "a value";
      obj1.b = "b value";
      obj1.c = { d: "d value", f: "f value" };
      const obj2 = { b: "b new", c: { d: "d new" } };
      mutate(obj1, obj2);
      should.not.exists(Object.getPrototypeOf(obj1));
      ({ ...obj1 }).should.eql({
        a: "a value",
        b: "b new",
        c: { d: "d new", f: "f value" },
      });
    });

    it("dont merge proto", function () {
      const src = {};
      mutate(src, JSON.parse('{"__proto__": {"polluted": "ohno"}}'));
      const obj = Object.create({});
      should.not.exists(obj.polluted);
    });
  });

  describe("2nd arg object", function () {
    it("object with object", function () {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = { b_key: "new b value" };
      mutate(obj1, obj2).b_key.should.eql("new b value");
    });

    it("object with null", function () {
      const obj1 = { a: { b: "1" } };
      const obj2 = { a: { b: null } };
      mutate(obj1, obj2).should.eql({ a: { b: null } });
    });

    it("object with undefined", function () {
      const obj1 = { a: { b: "1" } };
      const obj2 = { a: { b: undefined } };
      mutate(obj1, obj2).should.eql({ a: { b: "1" } });
    });

    it("avoid infinite loop", function () {
      const obj1 = { a_key: { b_key: "b value" } };
      const obj2 = obj1;
      mutate(obj1, obj2);
      obj1.a_key.b_key.should.eql("b value");
    });

    it("overwrite regexp value", function () {
      const obj1 = { a: /.*/gm, b: { c: /.*/ } };
      const obj2 = { b: { c: /^.*$/ } };
      mutate(obj1, obj2).should.eql({ a: /.*/gm, b: { c: /^.*$/ } });
    });

    it("buffer with buffer", function () {
      const obj1 = { a_key: Buffer.from("abc") };
      const obj2 = { a_key: Buffer.from("def") };
      const test = mutate(obj1, obj2);
      test.a_key.toString().should.eql("def");
    });

    it("string with string", function () {
      const obj1 = { a_key: "abc" };
      const obj2 = { a_key: "def" };
      mutate(obj1, obj2).a_key.should.eql("def");
    });

    it("array with object", function () {
      const obj1 = ["a", "b"];
      const obj2 = { a: "1", b: "2" };
      mutate(obj1, obj2).should.eql({ a: "1", b: "2" });
    });
  });

  describe("array", function () {
    it("reference array in first argument", function () {
      const obj1 = { a: [1, 2], b: [3, 4] };
      const obj2 = { b: [5, 6] };
      const res = mutate(obj1, obj2);
      res.should.eql({ a: [1, 2], b: [5, 6] });
      obj1.a.shift();
      res.should.eql({ a: [2], b: [5, 6] });
    });

    it("copy array in following argument", function () {
      const obj1 = { a: [1, 2], b: [3, 4] };
      const obj2 = { b: [5, 6] };
      const obj3 = { c: [7, 8] };
      const res = mutate(obj1, obj2, obj3);
      res.should.eql({ a: [1, 2], b: [5, 6], c: [7, 8] });
      obj2.b.shift();
      obj3.c.shift();
      res.should.eql({ a: [1, 2], b: [5, 6], c: [7, 8] });
    });

    it("array elements are cloned", function () {
      const obj1 = { a: null };
      const obj2 = { a: [{ b: { c: 3, d: 4 } }] };
      const res = mutate(obj1, obj2);
      obj2.a[0].b.c = 5;
      res.should.eql({ a: [{ b: { c: 3, d: 4 } }] });
    });
  });
});
