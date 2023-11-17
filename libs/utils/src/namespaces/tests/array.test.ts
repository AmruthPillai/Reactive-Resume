import { describe, expect, it } from "vitest";

import { findItemInLayout, moveItemInLayout, removeItemInLayout } from "../array";

describe("findItemInLayout", () => {
  it("should find the correct location of an item", () => {
    const layout = [
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ];
    const item = "item3";
    const expectedLocation = { page: 1, column: 0, section: 0 };

    const location = findItemInLayout(item, layout);

    expect(location).toEqual(expectedLocation);
  });

  it("should return null if the item is not found", () => {
    const layout = [
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ];
    const item = "item5";

    const location = findItemInLayout(item, layout);

    expect(location).toBeNull();
  });
});

describe("removeItemInLayout", () => {
  it("should remove the item and return its location", () => {
    const layout = [
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ];
    const item = "item3";
    const expectedLocation = { page: 1, column: 0, section: 0 };

    const location = removeItemInLayout(item, layout);

    expect(location).toEqual(expectedLocation);
    expect(layout[1][0]).not.toContain(item);
  });

  it("should return null and not modify layout if the item is not found", () => {
    const layout = [
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ];
    const item = "item5";

    const location = removeItemInLayout(item, layout);

    expect(location).toBeNull();
    expect(layout).toEqual([
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ]);
  });
});

describe("moveItemInLayout", () => {
  it("should move an item from the current location to the target location", () => {
    const layout = [
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ];
    const current = { page: 0, column: 1, section: 0 };
    const target = { page: 1, column: 0, section: 1 };
    const expectedLayout = [
      [["item1"], []],
      [["item3", "item2"], ["item4"]],
    ];

    const newLayout = moveItemInLayout(current, target, layout);

    expect(newLayout).toEqual(expectedLayout);
  });

  it("should not mutate the original layout array", () => {
    const layout = [
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ];
    const layoutCopy = JSON.parse(JSON.stringify(layout));
    const current = { page: 0, column: 1, section: 0 };
    const target = { page: 1, column: 0, section: 1 };

    moveItemInLayout(current, target, layout);

    expect(layout).toEqual(layoutCopy);
  });

  it("should handle the case where the current and target locations are the same", () => {
    const layout = [
      [["item1"], ["item2"]],
      [["item3"], ["item4"]],
    ];
    const current = { page: 1, column: 0, section: 0 };
    const target = { page: 1, column: 0, section: 0 };

    const newLayout = moveItemInLayout(current, target, layout);

    expect(newLayout).toEqual(layout);
  });

  it("moves an item to the specified target location", () => {
    const layout = [
      [["A", "B"], ["C"]],
      [["D"], ["E", "F"]],
    ];
    const current = { page: 0, column: 0, section: 1 };
    const target = { page: 1, column: 1, section: 1 };
    const result = moveItemInLayout(current, target, layout);
    expect(result).toEqual([
      [["A"], ["C"]],
      [["D"], ["E", "B", "F"]],
    ]);
  });

  it("handles moving an item within the same column", () => {
    const layout = [[["A", "B"]], [["C", "D"]]];
    const current = { page: 0, column: 0, section: 0 };
    const target = { page: 0, column: 0, section: 1 };
    const result = moveItemInLayout(current, target, layout);
    expect(result).toEqual([[["B", "A"]], [["C", "D"]]]);
  });

  it("handles moving an item to the beginning of a column", () => {
    const layout = [[["A"], ["B", "C"]], [["D"]]];
    const current = { page: 1, column: 0, section: 0 };
    const target = { page: 0, column: 1, section: 0 };
    const result = moveItemInLayout(current, target, layout);
    expect(result).toEqual([[["A"], ["D", "B", "C"]], [[]]]);
  });

  it("handles moving an item to an empty column", () => {
    const layout = [[["A"], []], [["B"]]];
    const current = { page: 0, column: 0, section: 0 };
    const target = { page: 0, column: 1, section: 0 };
    const result = moveItemInLayout(current, target, layout);
    expect(result).toEqual([[[], ["A"]], [["B"]]]);
  });

  it("returns the same layout if the current location is invalid", () => {
    const layout = [[["A"], ["B"]]];
    const current = { page: 2, column: 0, section: 0 };
    const target = { page: 0, column: 1, section: 0 };
    const result = moveItemInLayout(current, target, layout);
    expect(result).toEqual(layout);
  });

  it("returns the same layout if the target location is invalid", () => {
    const layout = [[["A"], ["B"]]];
    const current = { page: 0, column: 0, section: 0 };
    const target = { page: 2, column: 0, section: 0 };
    const result = moveItemInLayout(current, target, layout);
    expect(result).toEqual(layout);
  });
});
