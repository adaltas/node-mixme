import { should } from "chai";
import { mutate } from "../src";
should();

describe("mutate(js)", function () {
  describe("1st arg not object", function () {
    it("null makes next object immutable", function () {
      const source = { a_key: "a value", b_key: "b value" };
      const result = mutate(null, source);
      source.a_key = "new value";
      result.a_key.should.eql("a value");
    });
  });

  describe("2nd arg not object", function () {
    it("object with string", function () {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = "b";
      mutate(obj1, obj2).should.eql("b");
    });

    it("object with undefined", function () {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = undefined;
      mutate(obj1, obj2).should.eql({ a_key: "a value", b_key: "b value" });
    });

    it("object with null", function () {
      const obj1 = { a_key: "a value", b_key: "b value" };
      const obj2 = null;
      should().not.exist(mutate(obj1, obj2));
    });
  });
});
