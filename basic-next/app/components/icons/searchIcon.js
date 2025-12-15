"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchIcon = () => {
    const handleSearch =() => {
        console.log("search")
    }
    return (
        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch}/>
    )
}

export default SearchIcon