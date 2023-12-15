import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const decodeJsonData = (payload:any) => {
  const decoder = new TextDecoder();
  const jsonData = decoder.decode(payload);
  return JSON.parse(jsonData);
}