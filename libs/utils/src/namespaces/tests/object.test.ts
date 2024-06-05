import { describe, expect, it } from "vitest";

import { exclude } from "../object";

describe("exclude", () => {
  type TestObject = {
    id: number;
    name: string;
    age: number;
    email: string;
  };

  it("excludes specified keys from the object", () => {
    const object: TestObject = {
      id: 1,
      name: "Alice",
      age: 30,
      email: "alice@example.com",
    };
    const result = exclude(object, ["age", "email"]);

    expect(result).toEqual({ id: 1, name: "Alice" });
    expect(result).not.toHaveProperty("age");
    expect(result).not.toHaveProperty("email");
  });

  it("returns the same object if no keys are specified", () => {
    const object: TestObject = {
      id: 1,
      name: "Alice",
      age: 30,
      email: "alice@example.com",
    };
    const keysToExclude: (keyof TestObject)[] = [];
    const result = exclude(object, keysToExclude);

    expect(result).toEqual(object);
  });

  it("does not modify the original object", () => {
    const object: TestObject = {
      id: 1,
      name: "Alice",
      age: 30,
      email: "alice@example.com",
    };
    exclude(object, ["age", "email"]);

    expect(object).toHaveProperty("age");
    expect(object).toHaveProperty("email");
  });

  it("handles cases where keys to exclude are not present in the object", () => {
    const object: TestObject = {
      id: 1,
      name: "Alice",
      age: 30,
      email: "alice@example.com",
    };
    const keysToExclude = ["nonExistentKey" as keyof TestObject];
    const result = exclude(object, keysToExclude);

    expect(result).toEqual(object);
  });

  it("returns the input if it is not an object", () => {
    const object: unknown = null;
    const keysToExclude = ["id"];

    // @ts-expect-error passing invalid input type for tests
    const result = exclude(object, keysToExclude);

    expect(result).toBeNull();
  });
});
