import { z } from 'zod'

const UserSchema = z.object({
  id: z.number(),
  long_id: z.string(),
  slug: z.nullable(z.string()),
  creation_dt: z.string().datetime(),
  entity_name: z.string(),
  email: z.nullable(z.string().trim().email()),
  roles: z.array(z.string()),
  is_active: z.boolean(),
  referral_code_id: z.nullable(z.number()),
  is_verified: z.boolean(),
  roles_has_admin: z.boolean(),
  roles_has_client: z.boolean(),
  fullname: z.string(),
  phone: z.string(),
  email_prefix: z.string(),
})
const SendResetEmailVerificationCodeOnEmailInSchema = z.object({
  new_email: z.string().trim().email(),
})
const SendResetEmailVerificationCodeOnEmailOutSchema = z.object({
  // VerificationCodeGeneral
  id: z.number(),
  long_id: z.string(),
  slug: z.nullable(z.string()),
  creation_dt: z.string().datetime(),
  entity_name: z.string(),
  type: z.string(),
  email: z.nullable(z.string().trim().email()),
  user_id: z.nullable(z.string()),
  is_active: z.boolean(),
  allowed_types: z.array(z.string()),
})
const ResetEmailInSchema = z.object({
  // new_email: z.string().trim().email(),
  verification_code_value: z.string(),
})
// const RegisterOrAuthenticateInSchema = z.object({
//   verification_code_value: z.string(),
//   referral_code_value: z.optional(z.string()),
// })

type UserType = z.infer<typeof UserSchema>
type SendResetEmailVerificationCodeOnEmailInType = z.infer<
  typeof SendResetEmailVerificationCodeOnEmailInSchema
>
type SendResetEmailVerificationCodeOnEmailOutType = z.infer<
  typeof SendResetEmailVerificationCodeOnEmailOutSchema
>
type ResetEmailInType = z.infer<typeof ResetEmailInSchema>
// type RegisterOrAuthenticateInType = z.infer<typeof RegisterOrAuthenticateInSchema>

export {
  ResetEmailInSchema,
  SendResetEmailVerificationCodeOnEmailInSchema,
  SendResetEmailVerificationCodeOnEmailOutSchema,
  UserSchema,
}
export type {
  ResetEmailInType,
  SendResetEmailVerificationCodeOnEmailInType,
  SendResetEmailVerificationCodeOnEmailOutType,
  UserType,
}
