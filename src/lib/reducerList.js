export const categoryReducer = (categoryState, action) => {
    switch (action.type) {
        case"dep1" :
            return {...categoryState, dep2: [], dep1: action.data.children}
        case"dep2" :
            return {...categoryState, dep2: action.data.children}
        case"chosen" :
            return {...categoryState, chosen: action.data}
        default:
            return categoryState
    }
}
