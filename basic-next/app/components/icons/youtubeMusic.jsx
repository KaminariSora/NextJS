import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const YoutubeMusic = ({ shake }) => {
    return (
        <FontAwesomeIcon
            icon={faPlay}
            size="4x"
            className={shake ? "fa-shake" : ""}
            style={{ color: "#ff0000", }}
             />
    )
}

export default YoutubeMusic