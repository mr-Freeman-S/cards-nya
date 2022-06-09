export type initialTestStateType = {
    isChecked: boolean
}
const initialTestState = {
    isChecked: false
}

export const testReducer = (state: initialTestStateType = initialTestState, action: setCheckType) => {
    switch (action.type) {
        case 'SET-CHECK':
            return {...state, isChecked: action.isChecked};
        default:
            return state;
    }
}
//Action creators
export const setCheck = (isChecked: boolean) => {
    return {
        type: 'SET-CHECK',
        isChecked
    } as const
}
//types AC
export type setCheckType = ReturnType<typeof setCheck>