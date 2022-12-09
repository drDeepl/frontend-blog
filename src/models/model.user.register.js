class UserRegister {
  constructor() {
    this.props = {
      username: 'Имя пользователя',
      email: 'Электронная почта',
      role: 'USER',
      password: 'Пароль',
    };
    this.propsHide = {role: true};
    this.rules = {username: 'field', email: 'email', password: 'field'};
  }
}

export default new UserRegister();
