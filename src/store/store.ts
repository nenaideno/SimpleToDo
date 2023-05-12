import { configureStore} from "@reduxjs/toolkit";
import listSlice from "./listSlice";


const rtkStore = configureStore({
    reducer: {
        list: listSlice
    }
})

export default rtkStore