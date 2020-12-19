/**
 * Decorator that sets an Input() propertiy as required, will
 * throw an error if the property is not specified in the template.
 * I.e. @Input() @Required myProp: number;
 */
export function Required(target: Object, property: string): void {
  Object.defineProperty(target, property, {
    get() {
      console.log('img et', target, property);
      throw new Error(
        `Input '${property}' is required. Have you forgotten to add [${property}] = ... in your template?`
      );
    },
    set(value) {
      console.log('hai set', value); //&, target[property], value);
      Object.defineProperty(target, property, {
        value,
        writable: true,
        configurable: true,
      });
    },
  });
}
