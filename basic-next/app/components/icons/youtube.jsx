import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const YoutubeIcon = ({ shake }) => {
    return (
        <FontAwesomeIcon
            icon={faYoutube}
            size="4x"
            className={shake ? "fa-shake" : ""}
            style={{ color: "#ff0000" }}
        />
    );
};

export default YoutubeIcon;
