import { LayoutLocator } from "./types";

// Function to find a specific item in a layout
export const findItemInLayout = (item: string, layout: string[][][]): LayoutLocator | null => {
  for (let page = 0; page < layout.length; page++) {
    for (let column = 0; column < layout[page].length; column++) {
      for (let section = 0; section < layout[page][column].length; section++) {
        if (layout[page][column][section] === item) {
          return { page, column, section };
        }
      }
    }
  }

  return null;
};

// Function to remove a specific item in a layout
export const removeItemInLayout = (item: string, layout: string[][][]): LayoutLocator | null => {
  const locator = findItemInLayout(item, layout);

  if (locator) {
    layout[locator.page][locator.column].splice(locator.section, 1);
  }

  return locator;
};

// Function to move an item within a layout
export const moveItemInLayout = (
  current: LayoutLocator,
  target: LayoutLocator,
  layout: string[][][],
): string[][][] => {
  try {
    // Create a deep copy of the layout to avoid mutating the original array
    const newLayout = JSON.parse(JSON.stringify(layout)) as string[][][];

    // Get the item from the current location
    const item = newLayout[current.page][current.column][current.section];

    // Remove the item from the current location
    newLayout[current.page][current.column].splice(current.section, 1);

    // Insert the item at the target location
    newLayout[target.page][target.column].splice(target.section, 0, item);

    return newLayout;
  } catch (error) {
    return layout;
  }
};
