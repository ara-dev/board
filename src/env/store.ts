import { reactive, computed, readonly, UnwrapRef } from 'vue'
import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'

export enum Items {
    Right_Sidebar,
    Left_SideBar,
}

interface ViewItem{
    key : Items ,
    active : boolean,
    show : boolean
}

interface ViewItemState {
    items : Array<ViewItem>,
}

export  default class ViewItemStore {

    _state !: UnwrapNestedRefs<ViewItemState> ;

    constructor(state: ViewItemState) {

        this._state.items =[
            {key : Items.Right_Sidebar , active : true , show : true},
            {key : Items.Left_SideBar , active : true , show : true},
        ];

        this._state = reactive(state);
    }

    get state() : DeepReadonly<ViewItemState>
    {
       /* for (const i of Items) {

        }*/

        return readonly(this._state);
    }

    /*showViewItem(viewItem : ViewItem) : void{

    }

    hideViewItem(viewItem : ViewItem) : void {

    }

    activeViewItem() : void{

    }*/
}









