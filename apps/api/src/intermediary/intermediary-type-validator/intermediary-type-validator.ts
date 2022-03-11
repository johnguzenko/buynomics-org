export interface IIntermediaryTypeValidator<T> {
  validateOnCreate(info: T): void;
  validateOnEdit(previosInfo: T, newInfo: T): void;
}
