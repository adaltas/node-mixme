import "should";
import { camelize } from "../lib/index.js";

describe("camelize", () => {
  it("boolean true", () => {
    const obj = { a_a: "1", b_b: { d_d: { e_e: "5" } }, c_c: "3" };
    camelize(obj, true).should.eql({
      aA: "1",
      bB: { dD: { eE: "5" } },
      cC: "3",
    });
  });

  it("boolean 1", () => {
    const obj = { a_a: "1", b_b: { d_d: { e_e: "5" } }, c_c: "3" };
    camelize(obj, 1).should.eql({
      aA: "1",
      bB: { d_d: { e_e: "5" } },
      cC: "3",
    });
  });

  it("boolean 2", () => {
    const obj = { a_a: "1", b_b: { d_d: { e_e: "5" } }, c_c: "3" };
    camelize(obj, 2).should.eql({
      aA: "1",
      bB: { dD: { e_e: "5" } },
      cC: "3",
    });
  });
});
