import React, {useState} from 'react';
import {CreateAuctionFormLayout, FormLayout} from "./CreateAuctionFormLayout";
import {useInput} from "../../../hooks/useInput";
import {useFile} from "../../../hooks/useFile";
import {usePostWithFiles} from "../../../hooks/useFetch";

function CreateAuctionForm(props) {
    //const [imgList, setImgList] = useState([])
    const [handleInputChg, inputFormState] = useInput({
        title: "",
        description: "",
        startingBid: 0,
        categoryId: 0,
        closingTime: "",
        fixedPrice: false
    })
    const [handleImgChg, imgList] = useFile([])
    const [submitForFetch] = usePostWithFiles(inputFormState, imgList, "/auctions")
    return (
        <CreateAuctionFormLayout>
            <FormLayout onSubmit={submitForFetch}>
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
                즉결여부<input type={"checkbox"} onChange={handleInputChg} name={"fixedPrice"}/>
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