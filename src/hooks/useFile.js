import React, {useState} from 'react';

export function useFile(initialValue) {
    const [imgList, setImgList] = useState(initialValue)
    const formData = new FormData();
    const handleImgChg = (e) => {
        setImgList([...imgList, ...e.target.files]);
        imgList.forEach(image => {
            formData.append('files', image);
        });
    }
    return [handleImgChg, imgList]
}

