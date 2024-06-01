import { IElement } from "../Materials/UserLists/ListPage";

export function sortItemObjectByUpdatedDate(
  objectA: IElement,
  objectB: IElement
) {
  let dateA = new Date(objectA.updated_at);
  let dateB = new Date(objectB.updated_at);

  return dateB.getTime() - dateA.getTime();
}
