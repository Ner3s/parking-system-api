export class AlreadyExists extends Error {
  constructor(entity: string) {
    super(`${entity} already exists`);
  }
}
