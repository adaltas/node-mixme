
import should from 'should';
import { mutate } from "../lib/index.js";

describe("mixme.merge", () => {

  describe("1st arg not object", () => {
    it("null makes next object immutable", () => {
      const source = { a_key: "a value", b_key: "b value" };
      const result = mutate(null, source);
      source.a_key = "new value";
      result.a_key.should.eql("a value");
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

});
