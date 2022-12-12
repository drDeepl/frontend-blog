class UserLogin {
  constructor() {
    this.props = {username: 'Имя пользователя', password: 'Пароль'};
    this.rules = {username: '', password: ''};
    this.propsHide = {};
  }
}

export default new UserLogin();
