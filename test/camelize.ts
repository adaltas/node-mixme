import "should";
import { camelize } from "../src/index.js";

describe("camelize", function () {
  it("boolean true", function () {
    const obj = { a_a: "1", b_b: { d_d: { e_e: "5" } }, c_c: "3" };
    camelize(obj, true).should.eql({
      aA: "1",
      bB: { dD: { eE: "5" } },
      cC: "3",
    });
  });

  it("boolean 1", function () {
    const obj = { a_a: "1", b_b: { d_d: { e_e: "5" } }, c_c: "3" };
    camelize(obj, 1).should.eql({
      aA: "1",
      bB: { d_d: { e_e: "5" } },
      cC: "3",
    });
  });

  it("boolean 2", function () {
    const obj = { a_a: "1", b_b: { d_d: { e_e: "5" } }, c_c: "3" };
    camelize(obj, 2).should.eql({
      aA: "1",
      bB: { dD: { e_e: "5" } },
      cC: "3",
    });
  });
});
