import test from "ava";
import XXX from "../dist/index.js";

test("constructor function check", t => {
  const msg = "should be a function i.e. construction fn.";
  const actual = typeof XXX === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("init", t => {
  const msg1 = "should construction fn. return an object i.e. state";
  const actual1 = typeof XXX() === "object";
  const expected1 = true;
  t.is(actual1, expected1, msg1);
});
