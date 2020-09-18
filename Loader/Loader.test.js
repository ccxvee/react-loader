import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Loader from "./Loader";
import { IDLE, LOADING, SUCCESS, ERROR } from "./statuses";

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

it("throws an error if status is undefined", () => {
  expect(() => render(<Loader />)).toThrowErrorMatchingInlineSnapshot(
    `"The status property must be one of the following string values: 'idle', 'loading', 'success' or 'error'."`
  );

  console.error.mockClear();
});

it("throws an error if status is not equal to IDLE, LOADING, SUCCESS or ERROR", () => {
  expect(() =>
    render(<Loader status={"unknown"} />)
  ).toThrowErrorMatchingInlineSnapshot(
    `"The status property must be one of the following string values: 'idle', 'loading', 'success' or 'error'."`
  );

  console.error.mockClear();
});

it("requires only status prop", () => {
  expect(() => render(<Loader status={IDLE} />));
});

it("returns idleView if status is equal to IDLE", () => {
  render(
    <Loader
      status={IDLE}
      idleView={"idleView"}
      loadingView={"loadingView"}
      successView={"successView"}
      errorView={"errorView"}
    >
      children
    </Loader>
  );

  expect(screen.getAllByText("idleView").length).toBe(1);
});

it("returns null if status is equal to IDLE and idleView is undefined", () => {
  const { baseElement } = render(
    <Loader
      status={IDLE}
      loadingView={"loadingView"}
      successView={"successView"}
      errorView={"errorView"}
    >
      children
    </Loader>
  );

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
    </body>
  `);
});

it("returns loadingView if status is equal to LOADING", () => {
  render(
    <Loader
      status={LOADING}
      idleView={"idleView"}
      loadingView={"loadingView"}
      successView={"successView"}
      errorView={"errorView"}
    >
      children
    </Loader>
  );

  expect(screen.getAllByText("loadingView").length).toBe(1);
});

it("returns null if status is equal to LOADING and loadingView is undefined", () => {
  const { baseElement } = render(
    <Loader
      status={LOADING}
      idleView={"idleView"}
      successView={"successView"}
      errorView={"errorView"}
    >
      children
    </Loader>
  );

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
    </body>
  `);
});

it("returns errorView if status is equal to ERROR", () => {
  render(
    <Loader
      status={ERROR}
      idleView={"idleView"}
      loadingView={"loadingView"}
      successView={"successView"}
      errorView={"errorView"}
    >
      children
    </Loader>
  );

  expect(screen.getAllByText("errorView").length).toBe(1);
});

it("returns null if status is equal to ERROR and errorView is undefined", () => {
  const { baseElement } = render(
    <Loader
      status={ERROR}
      idleView={"idleView"}
      loadingView={"loadingView"}
      successView={"successView"}
    >
      children
    </Loader>
  );

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
    </body>
  `);
});

it(`throws an error if 
status is equal to SUCCESS 
AND successView is defined 
AND children is defined`, () => {
  expect(() =>
    render(
      <Loader
        status={SUCCESS}
        idleView={"idleView"}
        loadingView={"loadingView"}
        successView={"successView"}
        errorView={"errorView"}
      >
        children
      </Loader>
    )
  ).toThrowErrorMatchingInlineSnapshot(
    `"Only one of the following properties can be defined at the same time: 'successView' or 'children'."`
  );

  cleanup();

  expect(() =>
    render(
      <Loader
        status={SUCCESS}
        idleView={"idleView"}
        loadingView={"loadingView"}
        successView={null}
        errorView={"errorView"}
      >
        {null}
      </Loader>
    )
  ).toThrowErrorMatchingInlineSnapshot(
    `"Only one of the following properties can be defined at the same time: 'successView' or 'children'."`
  );

  cleanup();

  expect(() =>
    render(
      <Loader
        status={SUCCESS}
        idleView={"idleView"}
        loadingView={"loadingView"}
        successView={0}
        errorView={"errorView"}
      >
        {""}
      </Loader>
    )
  ).toThrowErrorMatchingInlineSnapshot(
    `"Only one of the following properties can be defined at the same time: 'successView' or 'children'."`
  );

  console.error.mockClear();
});

it(`returns successView if 
status is equal to SUCCESS
AND successView is defined
AND children is undefined`, () => {
  const { rerender } = render(
    <Loader
      status={SUCCESS}
      idleView={"idleView"}
      loadingView={"loadingView"}
      successView={"successView"}
      errorView={"errorView"}
    />
  );

  expect(screen.getAllByText("successView").length).toBe(1);

  rerender(
    <Loader
      status={SUCCESS}
      idleView={"idleView"}
      loadingView={"loadingView"}
      successView={0}
      errorView={"errorView"}
    />
  );

  expect(screen.getAllByText("0").length).toBe(1);

  cleanup();

  const { baseElement } = render(
    <Loader
      status={SUCCESS}
      idleView={"idleView"}
      loadingView={"loadingView"}
      successView={null}
      errorView={"errorView"}
    />
  );

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
    </body>
  `);
});

it(`returns children if 
status is equal to SUCCESS 
AND successView is undefined
AND children is defined`, () => {
  const { rerender } = render(
    <Loader
      status={SUCCESS}
      idleView={"idleView"}
      loadingView={"loadingView"}
      errorView={"errorView"}
    >
      children
    </Loader>
  );

  expect(screen.getAllByText("children").length).toBe(1);

  rerender(
    <Loader
      status={SUCCESS}
      idleView={"idleView"}
      loadingView={"loadingView"}
      errorView={"errorView"}
    >
      {0}
    </Loader>
  );

  expect(screen.getAllByText("0").length).toBe(1);

  cleanup();

  const { baseElement } = render(
    <Loader
      status={SUCCESS}
      idleView={"idleView"}
      loadingView={"loadingView"}
      errorView={"errorView"}
    >
      {null}
    </Loader>
  );

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
    </body>
  `);
});

it(`returns null if 
status is equal to SUCCESS
AND successView is undefined
AND children is undefined`, () => {
  const { baseElement } = render(
    <Loader
      status={SUCCESS}
      idleView={"idleView"}
      loadingView={"loadingView"}
      errorView={"errorView"}
    />
  );

  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div />
    </body>
  `);
});
