import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Loader } from "./Loader";

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  try {
    expect(console.error).not.toHaveBeenCalled();
  } catch (e) {
    throw new Error(
      `console.error was called unexpectedly (make sure to assert all calls and console.error.mockClear() at the end of the test)`
    );
  }
});

it("requires loadingStatus prop", () => {
  expect(() =>
    render(<Loader>child</Loader>)
  ).toThrowErrorMatchingInlineSnapshot(`"requires loadingStatus prop"`);

  console.error.mockClear();
});

it("does not require children", () => {
  render(<Loader loadingStatus="idle" />);
});
