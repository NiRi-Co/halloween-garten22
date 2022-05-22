import { defineStore } from 'pinia'
import moment, {type Moment} from "moment"

interface IAuthState {
  token?: string,
  expiresAt?: Moment
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuthState => ({
    token: undefined,
    expiresAt: undefined
  }),
  actions: {
    login(token: string, expiresIn: string) {
      this.expiresAt = moment().add(Number.parseInt(expiresIn), "days")
      this.token = token
    },
    logout() {
      this.token = undefined
      this.expiresAt = undefined
    },
    getExpiration() {
      if (this.expiresAt) {
        return this.expiresAt
      } else {
        return moment()
      }
    },
    isLoggedIn() {
      return moment().isBefore(this.getExpiration(), "second")
    }
  }
})
