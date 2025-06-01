import { ApiBase, apiBase } from '@/src/shared/api/base'
import {
  // RegisterOrAuthenticateInSchema,
  // RegisterOrAuthenticateInType,
  ResetEmailInSchema,
  ResetEmailInType,
  SendResetEmailVerificationCodeOnEmailInSchema,
  SendResetEmailVerificationCodeOnEmailInType,
  SendResetEmailVerificationCodeOnEmailOutType,
  UserType,
} from '../schemas'

class ApiUser {
  apiBase: ApiBase

  constructor() {
    this.apiBase = new ApiBase()
  }

  async getCurrentUser(): Promise<UserType> {
    try {
      const data = await apiBase.get<UserType>(`/client/get_current_user`)
      return data
    } catch (e) {
      throw e
    }
  }

  async sendResetEmailVerificationCodeOnEmail(
    sendResetEmailVerificationCodeOnEmailIn: SendResetEmailVerificationCodeOnEmailInType,
  ): Promise<SendResetEmailVerificationCodeOnEmailOutType> {
    try {
      SendResetEmailVerificationCodeOnEmailInSchema.parse(
        sendResetEmailVerificationCodeOnEmailIn,
      )
      const data =
        await apiBase.get<SendResetEmailVerificationCodeOnEmailOutType>(
          `/client/send_reset_email_verification_code_on_email`,
          {
            params: sendResetEmailVerificationCodeOnEmailIn,
          },
        )
      return data
    } catch (e) {
      throw e
    }
  }

  async resetEmail(resetEmailIn: ResetEmailInType): Promise<UserType> {
    try {
      ResetEmailInSchema.parse(resetEmailIn)
      const data = await apiBase.get<UserType>(`/client/reset_email`, {
        params: resetEmailIn,
      })
      return data
    } catch (e) {
      throw e
    }
  }

  // async registerOrAuthenticate(registerOrAuthenticateIn: RegisterOrAuthenticateInType): Promise<UserType> {
  //   try {
  //     RegisterOrAuthenticateInSchema.parse(registerOrAuthenticateIn)
  //     const data = await apiBase.get<UserType>(`/general/register_or_authenticate`, {
  //       params: registerOrAuthenticateIn,
  //     })
  //     return data
  //   } catch (e) {
  //     throw e
  //   }
  // }
}

const apiUser = new ApiUser()
export { apiUser }
