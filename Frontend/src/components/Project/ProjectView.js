import React, {useContext} from "react"
import * as UI from "@chakra-ui/react"

const Project = ({project}) => {

    const handleOnClick = () => {

    }



    return (
        <UI.Button mt={5} width="full" bg="brand.tertiary" onClick={handleOnClick}>
            View
        </UI.Button>
    )
}

export default Project;