import { Spinner } from '@chakra-ui/react'
import './loader.scss'

export const Loader = () => {
    return (
        <div className="loader">
            <Spinner
                color="white"
                animationDuration="0.8s"
                width={'60px'}
                height={'60px'}
                borderWidth="7px"
            />
        </div>
    )
}
