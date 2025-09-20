import React,{useEffect} from 'react'
import {type Component,useComponentsStore} from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'

export function EditorArea() {
    const {components,addComponent,deleteComponent} = useComponentsStore()
    const {componentConfig} = useComponentConfigStore()
   /*  useEffect(()=>{
        addComponent({
            id:11,
            name:'Page',
            props:{},
            children:[]
        },1)
        addComponent({
            id:12,
            name:'Container',
            props:{},
            children:[]
        },11)
        addComponent({
            id:21,
            name:'Button',
            props:{},
            children:[]
        },12)
         setTimeout(()=>{
            deleteComponent(21)
        },3000)
        setTimeout(()=>{
            deleteComponent(12)
        },6000)
        setTimeout(()=>{
            deleteComponent(11)
        },9000) 
    },[]) */

    function renderComponents(components:Component[]):React.ReactNode{
        return components.map((component:Component)=>{
            const config = componentConfig?.[component.name]
            if (!config?.component){
                return null
            }
            return React.createElement(
                config.component,
                {
                    key:component.id,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
    }
    
    return (
        <div>
           <pre>
            {JSON.stringify(components,null,2)}
            </pre>
            {renderComponents(components)}
        </div>
    )
}