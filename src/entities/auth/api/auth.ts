import { apiBase } from '@/src/shared/api/base'
import {
  AuthenticateInSchema,
  AuthenticateInType,
  AuthenticateOutType,
  ConfirmVerificationCodeForAuthorizationInSchema,
  ConfirmVerificationCodeForAuthorizationInType,
  ConfirmVerificationCodeForAuthorizationOutType,
  GetVerificationCodeInSchema,
  GetVerificationCodeInType,
  GetVerificationCodeOutType,
  RegisterOrAuthenticateInSchema,
  RegisterOrAuthenticateInType,
  RegisterOrAuthenticateOutType,
  SendRegisterOrAuthenticateVerificationCodeOnEmailInSchema,
  SendRegisterOrAuthenticateVerificationCodeOnEmailInType,
  SendRegisterOrAuthenticateVerificationCodeOnEmailOutType,
  SendVerificationCodeForAuthorizationInSchema,
  SendVerificationCodeForAuthorizationInType,
  SendVerificationCodeForAuthorizationOutType,
} from '../schemas'

class ApiAuth {
  async registerOrAuthenticate(
    registerOrAuthenticateIn: RegisterOrAuthenticateInType,
  ): Promise<RegisterOrAuthenticateOutType> {
    try {
      RegisterOrAuthenticateInSchema.parse(registerOrAuthenticateIn)
      console.log('WORK')
      const data = await apiBase.get<RegisterOrAuthenticateOutType>(
        `/general/register_or_authenticate`,
        {
          params: registerOrAuthenticateIn,
        },
      )
      return data
    } catch (e) {
      // console.log('roa', e.response)
      throw e
    }
  }

  async sendRegisterOrAuthenticateVerificationCodeOnEmail(
    sendRegisterOrAuthenticateVerificationCodeOnEmailIn: SendRegisterOrAuthenticateVerificationCodeOnEmailInType,
  ): Promise<SendRegisterOrAuthenticateVerificationCodeOnEmailOutType> {
    try {
      SendRegisterOrAuthenticateVerificationCodeOnEmailInSchema.parse(
        sendRegisterOrAuthenticateVerificationCodeOnEmailIn,
      )
      const data =
        await apiBase.get<SendRegisterOrAuthenticateVerificationCodeOnEmailOutType>(
          `/general/send_register_or_authenticate_verification_code_on_email`,
          {
            params: sendRegisterOrAuthenticateVerificationCodeOnEmailIn,
          },
        )
      return data
    } catch (e) {
      throw e
    }
  }

  async sendVerificationCodeForAuthorization(
    sendVerificationCodeForAuthorizationIn: SendVerificationCodeForAuthorizationInType,
  ): Promise<SendVerificationCodeForAuthorizationOutType> {
    try {
      SendVerificationCodeForAuthorizationInSchema.parse(sendVerificationCodeForAuthorizationIn)
      const data = await apiBase.post<SendVerificationCodeForAuthorizationOutType>(
        `/general/send_verification_code_for_authorization`,
        sendVerificationCodeForAuthorizationIn
      )
      return data
    } catch (e) {
      throw e
    }
  }

  async confirmVerificationCodeForAuthorization(
    confirmVerificationCodeForAuthorizationIn: ConfirmVerificationCodeForAuthorizationInType,
  ): Promise<ConfirmVerificationCodeForAuthorizationOutType> {
    try {
      ConfirmVerificationCodeForAuthorizationInSchema.parse(confirmVerificationCodeForAuthorizationIn)
      const data = await apiBase.post<ConfirmVerificationCodeForAuthorizationOutType>(
        `/general/confirm_verification_code_for_authentication`,
        confirmVerificationCodeForAuthorizationIn
      )
      return data
    } catch (e) {
      throw e
    }
  }

  async authenticate(
    authenticateIn: AuthenticateInType,
  ): Promise<AuthenticateOutType> {
    try {
      AuthenticateInSchema.parse(authenticateIn)
      const data = await apiBase.post<AuthenticateOutType>(
        `/general/authenticate`,
        authenticateIn
      )
      return data
    } catch (e) {
      throw e
    }
  }

  async getVerificationCode(
    getVerificationCodeIn: GetVerificationCodeInType,
  ): Promise<GetVerificationCodeOutType> {
    try {
      GetVerificationCodeInSchema.parse(getVerificationCodeIn)
      const data = await apiBase.get<GetVerificationCodeOutType>(
        `/general/get_verification_code`,
        {params: getVerificationCodeIn}
      )
      return data
    } catch (e) {
      throw e
    }
  }
}

const apiAuth = new ApiAuth()
export { apiAuth }
