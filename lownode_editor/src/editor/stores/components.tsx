/* 编辑区域的数据由store管理 */
import { create } from 'zustand'
/* 类型约束 */
export interface Component{
    id:number;
    name:string;
    props?:string;
    children?:Component[];
    parentId?:number;
}

interface State{
    components:Component[];
}
//store 主要提供 State 和 Actions
interface Action{
    
}