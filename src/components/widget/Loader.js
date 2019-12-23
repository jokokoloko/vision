import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shop';
import Shroud from './Shroud';

const Loader = () => {
    const { isLoading } = useContext(ShopContext);
    return (
        <Shroud isOpen={isLoading}>
            <svg width="120" height="15" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                <circle cx="15" cy="15" r="10">
                    <animate
                        attributeName="fill-opacity"
                        from="1"
                        to="1"
                        begin="0s"
                        dur="1s"
                        values="1;.3;.3"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle cx="60" cy="15" r="10">
                    <animate
                        attributeName="fill-opacity"
                        from="1"
                        to="1"
                        begin="0s"
                        dur="1s"
                        values=".3;1;.3"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle cx="105" cy="15" r="10">
                    <animate
                        attributeName="fill-opacity"
                        from="1"
                        to="1"
                        begin="0s"
                        dur="1s"
                        values=".3;.3;1"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </Shroud>
    );
};

export default Loader;
