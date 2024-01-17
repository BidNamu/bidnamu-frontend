import React, {useState} from 'react';
import {CreateAuctionFormLayout, FormLayout} from "./CreateAuctionFormLayout";
import {useInput} from "../../../hooks/useInput";
import {instance} from "../../../apis/utils/instance";

function CreateAuctionForm(props) {
    const [imgList, setImgList] = useState([])
    const [handleInputChg, inputFormState] = useInput({
        title: "",
        description: "",
        startingBid: 0,
        categoryId: 0,
        closingTime: "",
        fixedPrice: false
    })
    const handleImgChg = (e) => {
        setImgList([...imgList, ...e.target.files]);
    };
    const createActionOnSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        imgList.forEach(image => {
            formData.append('files', image);
        });
        const fetchAuctionObj = {
            images: imgList, body: inputFormState
        }
        console.log(fetchAuctionObj)
        const result = await instance.post('/auctions', fetchAuctionObj);
        try {
            console.log(result)
            if (result.status === 200) {
                alert("회원가입을 완료하였습니다.")
            }
        } catch (err) {
            console.log("실패")
            alert("서버 통신 실패")
        }
    }
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