import {
  CommentValidation,
  RantValidationSchema,
} from "@/service/validation/rant.validation";
import { z } from "zod";

export interface Rant {
  id: string;
  rant: string;
  category: string;
  createdAt?: Date;
}
export type RantFormValue = z.infer<typeof RantValidationSchema>;
export type CommentFormValue = z.infer<typeof CommentValidation>;

export interface RantsResponse {
  payload: RantPayload;
  message: string;
}

export interface RantPayload {
  rants: Rant[];
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
