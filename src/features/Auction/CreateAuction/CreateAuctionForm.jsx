import React, {useReducer} from 'react';
import {CreateAuctionFormLayout, FormLayout} from "./CreateAuctionFormLayout";
import {useGet, usePostWithFiles} from "../../../hooks/useFetch";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createAuctionValid} from "../../../lib/validList";
import {categoryReducer} from "../../../lib/reducerList";

function CreateAuctionForm(props) {
    const {
        setValue, register, formState: {errors}, handleSubmit
    } = useForm({
        defaultValues: {
            title: "",
            images: null,
            description: "",
            categoryId: 0,
            startingBid: 1,
            fixedPrice: false,
            closingTime: "",
        }, resolver: yupResolver(createAuctionValid),
    })
    const categoryData = useGet("/categories")
    const submitWithFiles = usePostWithFiles("/auctions")
    const [categoryState, dispatch] = useReducer(categoryReducer, {dep1: undefined, dep2: undefined})
    return (<CreateAuctionFormLayout>
        <FormLayout onSubmit={handleSubmit((data) => {
            submitWithFiles(data)
        })}>
            <p>상품명</p>
            <input type={"text"} {...register("title")}/>
            <p> {errors.title?.message}</p>
            <br/>
            <p>상세설명</p>
            <textarea name={"description"} {...register("description")}/>
            <p> {errors.description?.message}</p>
            <br/>
            <div>
                <div>
                    <p>카테고리</p>
                    <ul>
                        {categoryData?.map(
                            (ele) => {
                                return <li key={ele.id}>
                                    <button type={"button"}
                                            onClick={() => dispatch({type: "dep1", data: ele})}>{ele.name}</button>
                                </li>
                            }
                        )}
                    </ul>
                    <ul>
                        {categoryState?.dep1?.map(
                            (ele) => {
                                return <li key={ele.id}>
                                    <button type={"button"}
                                            onClick={() => dispatch({type: "dep2", data: ele})}>{ele.name}</button>
                                </li>
                            }
                        )}
                    </ul>
                    <ul>
                        {categoryState?.dep2?.map(
                            (ele) => {
                                return <li key={ele.id}>
                                    <button type={"button"} {...register("categoryId")} onClick={() => {
                                        setValue("categoryId", ele.id)
                                    }} value={ele.id}>
                                        {ele.name}
                                    </button>
                                </li>
                            }
                        )}
                    </ul>
                </div>
            </div>
            <p> {errors.categoryId?.message}</p>
            <br/>
            <p>시작가격</p>
            <input type={"number"}   {...register("startingBid")}/>원
            <p> {errors.startingBid?.message}</p>
            <br/>
            즉결여부
            <input type={"checkbox"} {...register("fixedPrice")}/>
            <p> {errors.fixedPrice?.message}</p>
            <p>상품사진</p>
            <input type={"file"} multiple {...register("images")}/>
            <p> {errors.images?.message}</p>
            <br/>
            <p>경매기간</p>
            <input type={"datetime-local"} {...register("closingTime")}/>
            <p> {errors.closingTime?.message}</p>
            <br/>
            <button type={"submit"}>경매 등록</button>
        </FormLayout>
    </CreateAuctionFormLayout>);
}

export default CreateAuctionForm;