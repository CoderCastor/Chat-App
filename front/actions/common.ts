"use server";
import { updateTag } from "next/cache";

export async function clearCache(tag: string) {
    updateTag(tag);
}
