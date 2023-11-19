import "should";
import { camelize_str } from "../lib/index.js";

describe("camelize_str", () => {
  it("all lowercase", () => {
    camelize_str("abc").should.eql("abc");
  });

  it("upercase between lowercase", () => {
    camelize_str("a_bc").should.eql("aBc");
  });

  it("all upercase", () => {
    camelize_str("ABC").should.eql("ABC");
  });

  it("all lowercase sperated by underscore", () => {
    camelize_str("a_b_c").should.eql("aBC");
  });

  it("all upercase sperated by underscore", () => {
    camelize_str("A_B_C").should.eql("ABC");
  });
});
