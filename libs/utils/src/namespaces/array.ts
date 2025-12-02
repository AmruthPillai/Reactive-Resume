import type { LayoutLocator } from "./types";

/**
 * Finds a specific item in a resume layout structure.
 *
 * @param item - The item identifier to search for
 * @param layout - The 3D layout array [page][column][section]
 * @returns The location of the item or null if not found
 *
 * @example
 * ```typescript
 * const layout = [[["summary", "experience"]]];
 * const location = findItemInLayout("experience", layout);
 * // Returns: { page: 0, column: 0, section: 1 }
 * ```
 */
export const findItemInLayout = (item: string, layout: string[][][]): LayoutLocator | null => {
  for (const [page, element] of layout.entries()) {
    for (const [column, element_] of element.entries()) {
      for (const [section, element__] of element_.entries()) {
        if (element__ === item) {
          return { page, column, section };
        }
      }
    }
  }

  return null;
};

/**
 * Removes a specific item from a resume layout structure.
 *
 * @param item - The item identifier to remove
 * @param layout - The 3D layout array (modified in place)
 * @returns The previous location of the item or null if not found
 *
 * @example
 * ```typescript
 * const layout = [[["summary", "experience"]]];
 * const location = removeItemInLayout("experience", layout);
 * // layout becomes: [[["summary"]]]
 * // Returns: { page: 0, column: 0, section: 1 }
 * ```
 */
export const removeItemInLayout = (item: string, layout: string[][][]): LayoutLocator | null => {
  const locator = findItemInLayout(item, layout);

  if (locator) {
    layout[locator.page][locator.column].splice(locator.section, 1);
  }

  return locator;
};

/**
 * Moves an item from one position to another within a resume layout structure.
 *
 * @param source - The current location of the item
 * @param destination - The target location for the item
 * @param layout - The 3D layout array (modified in place)
 * @returns True if the move was successful, false otherwise
 *
 * @example
 * ```typescript
 * const layout = [[["summary", "experience"], ["skills"]]];
 * const success = moveItemInLayout(
 *   { page: 0, column: 0, section: 1 }, // experience
 *   { page: 0, column: 1, section: 0 }, // before skills
 *   layout
 * );
 * ```
 */
export const moveItemInLayout = (
  current: LayoutLocator,
  target: LayoutLocator,
  layout: string[][][],
): string[][][] => {
  try {
    // Create a deep copy of the layout to avoid mutating the original array
    const newLayout = structuredClone(layout);

    // Get the item from the current location
    const item = newLayout[current.page][current.column][current.section];

    // Remove the item from the current location
    newLayout[current.page][current.column].splice(current.section, 1);

    // Insert the item at the target location
    newLayout[target.page][target.column].splice(target.section, 0, item);

    return newLayout;
  } catch {
    return layout;
  }
};
