import data from "../shared/data.json";
import { isItem } from "../shared/utils";

export const genders = ['female', 'male', 'unisex'] as const;

export const paginationLimit = 100;

export const dataSanitized = (data as any[]).filter(isItem);
