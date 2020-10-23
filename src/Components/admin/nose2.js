import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext';
const Nose2 = () => {

    // eslint-disable-next-line
    const [toggle, setToggle] = useState(false);
    const { dark} = useContext(AuthContext);
    useEffect(() => {
        const owo = () => {
            if (dark) {

                document.body.classList.remove('dark-bg')
                document.body.classList.add('light-bg')
            }
            else {

                document.body.classList.remove('light-bg')
                document.body.classList.add('dark-bg')
            }
            setToggle(dark)
        }
        owo()
    }, [dark,setToggle])
    return (
        <>
            <h1>NOSE 2</h1>
        </>
    )
}

export default Nose2