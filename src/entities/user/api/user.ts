import { ApiBase, apiBase } from '@/src/shared/api/base'
import {
  CreateTrustingToTrusterInSchema,
  CreateTrustingToTrusterInType,
  CreateTrustingToTrusterOutType,
  GetMyIncomingTrusterInVerificationCodeSInSchema,
  GetMyIncomingTrusterInVerificationCodeSInType,
  GetMyIncomingTrusterInVerificationCodeSOutType,
  // RegisterOrAuthenticateInSchema,
  // RegisterOrAuthenticateInType,
  ResetEmailInSchema,
  ResetEmailInType,
  SendResetEmailVerificationCodeOnEmailInSchema,
  SendResetEmailVerificationCodeOnEmailInType,
  SendResetEmailVerificationCodeOnEmailOutType,
  UpdateTrusterInVerificationCodeStatusInSchema,
  UpdateTrusterInVerificationCodeStatusInType,
  UpdateTrusterInVerificationCodeStatusOutType,
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

  async getMyTrusters(): Promise<UserType[]> {
    try {
      const data = await apiBase.get<UserType[]>(`/client/get_my_trusters`)
      return data
    } catch (e) {
      throw e
    }
  }

  async updateMyTrustInviteCode(): Promise<UserType> {
    try {
      const data = await apiBase.post<UserType>(`/client/update_my_trust_invite_code`, {})
      return data
    } catch (e) {
      throw e
    }
  }

  async getMyIncomingTrusterInVerificationCodeS(getMyIncomingTrusterInVerificationCodeSIn: GetMyIncomingTrusterInVerificationCodeSInType): Promise<GetMyIncomingTrusterInVerificationCodeSOutType[]> {
    try {
      GetMyIncomingTrusterInVerificationCodeSInSchema.parse(getMyIncomingTrusterInVerificationCodeSIn)
      const data = await apiBase.get<GetMyIncomingTrusterInVerificationCodeSOutType[]>(`/client/get_my_incoming_truster_in_verification_code_s`, {params: getMyIncomingTrusterInVerificationCodeSIn})
      return data
    } catch (e) {
      throw e
    }
  }

  async updateTrusterInVerificationCodeStatus(updateTrusterInVerificationCodeStatusIn: UpdateTrusterInVerificationCodeStatusInType): Promise<UpdateTrusterInVerificationCodeStatusOutType> {
    try {
      UpdateTrusterInVerificationCodeStatusInSchema.parse(updateTrusterInVerificationCodeStatusIn)
      const data = await apiBase.post<UpdateTrusterInVerificationCodeStatusOutType>(`/client/update_truster_in_verification_code_status`, updateTrusterInVerificationCodeStatusIn)
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

  async createTrustingToTruster(createTrustingToTrusterIn: CreateTrustingToTrusterInType): Promise<CreateTrustingToTrusterOutType> {
    try {
      CreateTrustingToTrusterInSchema.parse(createTrustingToTrusterIn)
      const data = await apiBase.post<CreateTrustingToTrusterOutType>(`/client/create_trusting_to_truster`, createTrustingToTrusterIn)
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
