import {z} from "zod"

const MAX_INPUT_TOKENS = 1000;

export const CreateChatSchema = z.object({
    conersationId: z.uuid().optional(),
    message: z.string().max(MAX_INPUT_TOKENS)
})

export type Role = "agent"|"user"

export type Message = {
    content: string,
    role: Role
}


export type Model =
  | "deepseek/deepseek-r1-0528-qwen3-8b:free"
  | "deepseek/deepseek-r1-0528:free";