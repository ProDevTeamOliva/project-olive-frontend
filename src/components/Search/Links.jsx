import { baseUrl } from "../../config/baseUrl";
import LinkSearchForTag from "./LinkSearchForTag";
import LinkSearchForUser from "./LinkSearchForUser";

export const getLinkForUser =
  ({ id, nameFirst, nameLast, avatar }, index) =>
  (setIsOpen) =>
    (
      <LinkSearchForUser
        key={index}
        id={id}
        nameFirst={nameFirst}
        nameLast={nameLast}
        avatar={avatar && baseUrl + avatar}
        onClose={() => setIsOpen(false)}
      />
    );

export const getLinkForTag = (tag, index) => (setIsOpen) =>
  <LinkSearchForTag key={index} tag={tag} onClose={() => setIsOpen(false)} />;
