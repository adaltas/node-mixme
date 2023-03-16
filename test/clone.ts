
import "should";
import { clone } from "../lib/index.js";

describe("clone", () => {
  it("array", () => {
    const source = ["a", { b: "c" }, 10, null, ["d", { e: "f" }]];
    const result = clone(source);
    result.should.eql(source);
    source.forEach((_, index) => {
      source[index] = null;
    });
    result.should.eql(["a", { b: "c" }, 10, null, ["d", { e: "f" }]]);
  });

  it("object", () => {
    const source = { a: "b", c: "d" } as { a: string | null, c: string | null};
    const result = clone(source);
    result.should.eql(source);
    source.a = null;
    source.c = null;
    result.should.eql({ a: "b", c: "d" });
  });

  it("accept all types", () => {
    clone(null);
    clone(true).should.eql(true);
    clone(1).should.eql(1);
    clone("a").should.eql("a");
  });
});
