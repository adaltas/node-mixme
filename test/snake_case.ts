import "should";
import { snake_case } from "../src/index.js";

describe("snake_case", function () {
  it("boolean true", function () {
    const obj = { aA: "1", bB: { dD: { eE: "5" } }, cC: "3" };
    snake_case(obj, true).should.eql({
      a_a: "1",
      b_b: { d_d: { e_e: "5" } },
      c_c: "3",
    });
  });

  it("boolean 1", function () {
    const obj = { aA: "1", bB: { dD: { eE: "5" } }, cC: "3" };
    snake_case(obj, 1).should.eql({
      a_a: "1",
      b_b: { dD: { eE: "5" } },
      c_c: "3",
    });
  });

  it("boolean 2", function () {
    const obj = { aA: "1", bB: { dD: { eE: "5" } }, cC: "3" };
    snake_case(obj, 2).should.eql({
      a_a: "1",
      b_b: { d_d: { eE: "5" } },
      c_c: "3",
    });
  });
});
