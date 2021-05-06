export default class Validate {
  load() {
    this.init();
  }
  init() {
    $('#info-form').parsley();
    $('#info-form').parsley().on('form:validated', function() {
      // In here, `this` is the parlsey instance of #some-input
      console.log('entra al submit', this);
      if(validationResult) {
        return 'hi'
      }
    });
  }
}