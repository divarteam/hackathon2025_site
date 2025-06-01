import { z } from 'zod'
import { UserSchema } from '../../user/schemas'

const TrusterInVerificationCodeSSchema = z.object({
  id: z.number(),
  long_id: z.string(),
  slug: z.nullable(z.string()),
  creation_dt: z.string().datetime(),
  entity_name: z.string(),
  status: z.string(),
  truster_id: z.number(),
  verification_code_id: z.number(),
  truster: UserSchema
})

const RegisterOrAuthenticateInSchema = z.object({
  // email: z.optioz.string().trim().email(),
  verification_code_value: z.optional(z.string()),
  referral_code_value: z.string().optional(),
})
const RegisterOrAuthenticateOutSchema = z.object({
  // UserTokenGeneral
  id: z.number(),
  long_id: z.string(),
  slug: z.nullable(z.string()),
  creation_dt: z.string().datetime(),
  entity_name: z.string(),
  value: z.string(),
  user_id: z.nullable(z.string()),
  is_active: z.boolean(),
  user: UserSchema,
})
const SendRegisterOrAuthenticateVerificationCodeOnEmailInSchema = z.object({
  email: z.string().trim().email(),
})
const SendRegisterOrAuthenticateVerificationCodeOnEmailOutSchema = z.object({
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


const SendVerificationCodeForAuthorizationInSchema = z.object({
  phone_or_email: z.string(),
})
const SendVerificationCodeForAuthorizationOutSchema = z.object({
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
  allowed_statuses: z.array(z.string()),
})
const ConfirmVerificationCodeForAuthorizationInSchema = z.object({
  verification_code_value: z.string(),
})
const ConfirmVerificationCodeForAuthorizationOutSchema = z.object({
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
  allowed_statuses: z.array(z.string()),
  status: z.string(),
  are_all_truster_in_verification_code_s_status_confirmed: z.boolean(),
})
const AuthenticateInSchema = z.object({
  verification_code_value: z.string(),
})
const AuthenticateOutSchema = z.object({
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
  allowed_statuses: z.array(z.string()),
  status: z.string(),
  value: z.string(),
})
const GetVerificationCodeInSchema = z.object({
  value: z.string(),
})
const GetVerificationCodeOutSchema = z.object({
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
  allowed_statuses: z.array(z.string()),
  status: z.string(),
  value: z.string(),
  are_all_truster_in_verification_code_s_status_confirmed: z.boolean(),
  truster_in_verification_code_s: z.array(TrusterInVerificationCodeSSchema),
})

type TrusterInVerificationCodeSType = z.infer<typeof TrusterInVerificationCodeSSchema>

type RegisterOrAuthenticateInType = z.infer<
  typeof RegisterOrAuthenticateInSchema
>
type RegisterOrAuthenticateOutType = z.infer<
  typeof RegisterOrAuthenticateOutSchema
>
type SendRegisterOrAuthenticateVerificationCodeOnEmailInType = z.infer<
  typeof SendRegisterOrAuthenticateVerificationCodeOnEmailInSchema
>
type SendRegisterOrAuthenticateVerificationCodeOnEmailOutType = z.infer<
  typeof SendRegisterOrAuthenticateVerificationCodeOnEmailOutSchema
>


type SendVerificationCodeForAuthorizationInType = z.infer<
  typeof SendVerificationCodeForAuthorizationInSchema
>
type SendVerificationCodeForAuthorizationOutType = z.infer<
  typeof SendVerificationCodeForAuthorizationOutSchema
>
type ConfirmVerificationCodeForAuthorizationInType = z.infer<
  typeof ConfirmVerificationCodeForAuthorizationInSchema
>
type ConfirmVerificationCodeForAuthorizationOutType = z.infer<
  typeof ConfirmVerificationCodeForAuthorizationOutSchema
>
type AuthenticateInType = z.infer<
  typeof AuthenticateInSchema
>
type AuthenticateOutType = z.infer<
  typeof AuthenticateOutSchema
>
type GetVerificationCodeInType = z.infer<
  typeof GetVerificationCodeInSchema
>
type GetVerificationCodeOutType = z.infer<
  typeof GetVerificationCodeOutSchema
>

export {
  TrusterInVerificationCodeSSchema,

  RegisterOrAuthenticateInSchema,
  RegisterOrAuthenticateOutSchema,
  SendRegisterOrAuthenticateVerificationCodeOnEmailInSchema,
  SendRegisterOrAuthenticateVerificationCodeOnEmailOutSchema,

  SendVerificationCodeForAuthorizationInSchema,
  SendVerificationCodeForAuthorizationOutSchema,
  ConfirmVerificationCodeForAuthorizationInSchema,
  ConfirmVerificationCodeForAuthorizationOutSchema,
  AuthenticateInSchema,
  AuthenticateOutSchema,
  GetVerificationCodeInSchema,
  GetVerificationCodeOutSchema,
}
export type {
  TrusterInVerificationCodeSType,

  RegisterOrAuthenticateInType,
  RegisterOrAuthenticateOutType,
  SendRegisterOrAuthenticateVerificationCodeOnEmailInType,
  SendRegisterOrAuthenticateVerificationCodeOnEmailOutType,

  SendVerificationCodeForAuthorizationInType,
  SendVerificationCodeForAuthorizationOutType,
  ConfirmVerificationCodeForAuthorizationInType,
  ConfirmVerificationCodeForAuthorizationOutType,
  AuthenticateInType,
  AuthenticateOutType,
  GetVerificationCodeInType,
  GetVerificationCodeOutType,
}
