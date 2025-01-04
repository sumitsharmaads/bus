import { userStorage } from "../db";
import { UserInfoType } from "../types";
export const defaultUser = {
  gender: null,
  fullname: "",
  email: "",
  phone: "",
  username: "",
  _id: null,
};
class User {
  private static _shareUser: User | null = null;

  static shareInstance(): User {
    if (!this._shareUser) {
      this._shareUser = new User();
      this._shareUser.initFromStorage();
    }
    return this._shareUser;
  }

  static initFromStorage() {
    return this.shareInstance().initFromStorage();
  }

  static saveToStorage() {
    return this.shareInstance().saveToStorage();
  }

  static loginUser(user: UserInfoType) {
    return this.shareInstance().loginUser(user);
  }

  static logout() {
    return this.shareInstance().logout();
  }

  static checkLogin() {
    if (this.shareInstance().isLogin) {
      return true;
    } else {
      return (window.location.href = "/Login");
    }
  }

  static get isLogin() {
    return this.shareInstance().isLogin;
  }

  static get isAdmin() {
    return this.shareInstance().isAdmin;
  }

  static get user() {
    return this.shareInstance().getUser();
  }

  static get isCaptin() {
    return this.shareInstance().isCaptin;
  }

  static updateUserInfo(user: Partial<UserInfoType>) {
    return this.shareInstance().updateUserInfo(user);
  }

  static getToken() {
    return this.shareInstance().getToken();
  }

  private info: {
    user: UserInfoType | null;
  };

  constructor() {
    this.info = {
      user: null,
    };
  }

  private initFromStorage() {
    const storedUser = userStorage.getItem("users");
    if (storedUser) {
      this.info = {
        user: storedUser,
      };
    }
  }

  private saveToStorage() {
    if (!this.isLogin) {
      userStorage.removeItem("users");
    } else {
      userStorage.setItem("users", this.info.user as UserInfoType);
    }
  }

  private loginUser(user: UserInfoType) {
    this.info = { user };
    this.saveToStorage();
  }

  private logout() {
    this.info = {
      user: null,
    };
    userStorage.removeItem("users");
  }

  private getUser(): Omit<UserInfoType, "token"> | null {
    if (!this.info.user) return null;
    const { token, ...userWithoutToken } = this.info.user;
    return userWithoutToken;
  }

  private updateUserInfo(user: Partial<UserInfoType>) {
    if (this.info.user) {
      this.info.user = { ...this.info.user, ...user };
      this.saveToStorage();
    }
  }

  private getToken(): string | null {
    return this.info.user?.token || null;
  }

  get isLogin() {
    return !!(
      this.info?.user &&
      this.info?.user?.token &&
      this.info?.user?._id
    );
  }

  get isAdmin() {
    return this.info.user?.roleType === 0;
  }

  get isGuest() {
    return this.info.user?.roleType === 1;
  }

  get isCaptin() {
    return this.info.user?.roleType === 2;
  }

  get UserInfo() {
    return this.info.user;
  }
}

export default User;
