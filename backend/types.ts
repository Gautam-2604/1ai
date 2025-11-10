import {z} from "zod"

const MAX_INPUT_TOKENS = 1000;
export const Model =["deepseek/deepseek-r1-0528-qwen3-8b:free", "deepseek/deepseek-r1-0528:free"]

export const CreateChatSchema = z.object({
    conversationId: z.uuid().optional(),
    message: z.string().max(MAX_INPUT_TOKENS),
    model: z.enum(Model)
})

export enum Role {
    Agent="agent",
    User="user"
}


export type Message = {
    content: string,
    role: Role
}

export type Messages = Message[]


