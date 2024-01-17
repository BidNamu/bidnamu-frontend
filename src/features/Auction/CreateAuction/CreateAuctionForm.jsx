import React, {useState} from 'react';
import {CreateAuctionFormLayout, FormLayout} from "./CreateAuctionFormLayout";
import {useInput} from "../../../hooks/useInput";
import {instance} from "../../../apis/utils/instance";

function CreateAuctionForm(props) {
    const [imgList, setImgList] = useState([])
    const [isFixedPrice, setIsFixedPrice] = useState(false)
    const [handleInputChg, inputFormState] = useInput({
        title: "",
        description: "",
        startingBid: 0,
        categoryId: 0,
        closingTime: "",
    })
    const createActionOnSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        // 폼에 데이터를 첨부하기 위해서는 form.append('키값(필드)', 데이터) 를 이용한다.
        // 폼에 파일 첨부. 파일 첨부 같은 경우에는 반복문을 통해 append 해주어야 한다.
        imgList.forEach(image => {
            formData.append('files', image);
        });
        inputFormState.fixedPrice = isFixedPrice
        await instance.post('/auctions', {
            images: imgList, body: inputFormState
        }, {
            headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8'},
        });

    }
    const handleImgChg = (e) => {
        setImgList([...imgList, ...e.target.files]);
    };

    console.log(inputFormState)
    return (
        <CreateAuctionFormLayout>
            <FormLayout onSubmit={createActionOnSubmit}>
                <p>상품명</p>
                <input type={"text"} name={"title"} onChange={handleInputChg}/>
                <br/>
                <p>상세설명</p>
                <textarea name={"description"} onChange={handleInputChg}/>
                <br/>
                <p>카테고리</p>
                <input type={"text"} name={"categoryId"} onChange={handleInputChg}/>
                <br/>
                <p>시작가격</p>
                <input type={"number"} onChange={handleInputChg} name={"startingBid"}/>원
                <br/>
                즉결여부<input type={"checkbox"} onChange={(e) => setIsFixedPrice(e.target.checked)} name={"fixedPrice"}/>
                <p>상품사진</p><input type={"file"} multiple onChange={handleImgChg} name={"images"}/>
                <br/>
                <p>경매기간</p>
                <input type={"datetime-local"} onChange={handleInputChg} name={"closingTime"}/>
                <br/>
                <button type={"submit"}>경매 등록</button>
            </FormLayout>
        </CreateAuctionFormLayout>
    );
}

export default CreateAuctionForm;