import "should";
import { camelize_str } from "../src/index.js";

describe("camelize_str", function () {
  it("all lowercase", function () {
    camelize_str("abc").should.eql("abc");
  });

  it("upercase between lowercase", function () {
    camelize_str("a_bc").should.eql("aBc");
  });

  it("all upercase", function () {
    camelize_str("ABC").should.eql("ABC");
  });

  it("all lowercase sperated by underscore", function () {
    camelize_str("a_b_c").should.eql("aBC");
  });

  it("all upercase sperated by underscore", function () {
    camelize_str("A_B_C").should.eql("ABC");
  });
});
