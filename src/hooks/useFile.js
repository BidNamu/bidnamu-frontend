import React, {useState} from 'react';

export function useFile(initialValue) {
    const [imgList, setImgList] = useState(initialValue)
    const handleImgChg = (e) => {
        setImgList([...e.target.files]);
        console.log(imgList)
    }

    return [handleImgChg, imgList]
}

