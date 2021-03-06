import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPencilAlt,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

export const icons = {
  check: <FontAwesomeIcon icon={faCheckCircle} className="ml-3" />,
  abort: <FontAwesomeIcon icon={faTimesCircle} className="ml-3" />,
  edit: <FontAwesomeIcon icon={faPencilAlt} className="text-danger edit-icon ml-3"/>,
  makeVisible: <FontAwesomeIcon icon={faEye} />,
  makeInvisible: <FontAwesomeIcon icon={faEyeSlash} />
};
