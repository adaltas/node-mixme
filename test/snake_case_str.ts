import { should } from "chai";
import { snake_case_str } from "../src";
should();

describe("snake_case_str", function () {
  it("all lowercase", function () {
    snake_case_str("abc").should.eql("abc");
  });

  it("upercase between lowercase", function () {
    snake_case_str("aBc").should.eql("a_bc");
  });

  it("all upercase", function () {
    snake_case_str("ABC").should.eql("abc");
  });

  it("all lowercase sperated by underscore", function () {
    snake_case_str("A_B_C").should.eql("a_b_c");
  });

  it("all upercase sperated by underscore", function () {
    snake_case_str("A_B_C").should.eql("a_b_c");
  });

  it("lowercase followed by multiple upercase", function () {
    snake_case_str("aBCdefGHI").should.eql("a_bcdef_ghi");
  });
});
