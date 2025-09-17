import {useEffect} from 'react'
import {useComponentsStore} from '../../stores/components'

export function EditorArea() {
    const {components,addComponent,deleteComponent} = useComponentsStore()
    useEffect(()=>{
        addComponent({
            id:11,
            name:'刘备',
            props:{},
            children:[]
        },0)
        addComponent({
            id:12,
            name:'关羽',
            props:{},
            children:[]
        },0)
        addComponent({
            id:21,
            name:'刘禅',
            props:{},
            children:[]
        },11)
        setTimeout(()=>{
            deleteComponent(21)
        },3000)
        setTimeout(()=>{
            deleteComponent(12)
        },6000)
        setTimeout(()=>{
            deleteComponent(11)
        },9000)
    },[])
    return (
        <div>
           <pre>{JSON.stringify(components,null,2)}</pre>
        </div>
    )
}