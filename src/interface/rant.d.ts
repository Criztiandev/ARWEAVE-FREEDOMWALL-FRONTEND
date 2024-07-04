import { rantValidationSchema } from "@/service/validation/rant.validation";
import { z } from "zod";

export interface rantSchema {
  id: string;
  rant: string;
}
export type RantFormValue = z.infer<typeof rantValidationSchema>;
