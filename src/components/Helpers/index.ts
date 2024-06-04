import { IElement } from "../Materials/UserLists/ListPage";

export function sortItemObjectByUpdatedDateDSC(
  objectA: IElement,
  objectB: IElement
) {
  let dateA = new Date(objectA.updated_at);
  let dateB = new Date(objectB.updated_at);

  return dateB.getTime() - dateA.getTime();
}
export function sortItemObjectByUpdatedDateASC(
  objectA: IElement,
  objectB: IElement
) {
  let dateA = new Date(objectA.updated_at);
  let dateB = new Date(objectB.updated_at);

  return dateA.getTime() - dateB.getTime();
}
