class CreateCard {
  constructor() {
    this.props = {
      title: 'Заголовоко',
      description: 'Описание',
      text: 'Первые строки..',
      image: 0,
      datetime_repeat: '',
      to_learn: false,
    };
    this.rules = {
      title: 'field',
      description: 'field',
      text: 'field',
      image: 'field',
      datetime_repeat: 'field',
      to_learn: 'boolean',
    };
    this.propsHide = {datetime_repeat: true};
  }
}

export default new CreateCard();
