import {initialTestStateType} from "./testReducer";

export const loginReducer = (state: initialTestStateType, action: any) => {
    switch (action.type) {
        case 'SET-CHECK':
            return {...state, isChecked: action.isChecked};
        default:
            return state;
    }
}