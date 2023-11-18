
import "should";
import { snake_case_str } from "../lib/index.js";

describe("snake_case", () => {
  it("all lowercase", () => {
    snake_case_str('abc').should.eql('abc');
  });
  it("upercase between lowercase", () => {
    snake_case_str('aBc').should.eql('a_bc');
  });
  it("all upercase", () => {
    snake_case_str('ABC').should.eql('abc');
  });
  it("all lowercase sperated by underscore", () => {
    snake_case_str('A_B_C').should.eql('a_b_c');
  });
  it("all upercase sperated by underscore", () => {
    snake_case_str('A_B_C').should.eql('a_b_c');
  });
  it("lowercase followed by multiple upercase", () => {
    snake_case_str('aBCdefGHI').should.eql('a_bcdef_ghi');
  });
});
