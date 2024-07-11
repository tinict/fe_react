import { useState } from 'react';
import Image from 'next/image';

const ImageFallback = ({ ...props }) => {
    const { src, fallbackSrc, alt } = props;
    
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            onError={() => setImgSrc(fallbackSrc)}
        />
    );
};

export default ImageFallback;
