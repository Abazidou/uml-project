export class method {

  public visibility: string;
  public name: string;

  constructor(fields?: Partial<Event>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

}
