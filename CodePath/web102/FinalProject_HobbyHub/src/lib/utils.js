import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * The latter styling will merge with the previous styling
 * @param  {...any} inputs 
 * @returns 
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
