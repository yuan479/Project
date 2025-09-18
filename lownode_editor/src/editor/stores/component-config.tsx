import { create } from 'zustand';
import Page from '../materials/Page';
import Container from '../materials/Container';
import Button from '../materials/Button';

export interface ComponentConfig {
    name: string;
    //约束defaultProps的键的类型为string，值的类型为any
    defaultProps: Record<string, any>
    component: any;
}
interface State {
    componentConfig: { [key: string]: ComponentConfig }
}

interface Action {
    registerComponent: (
        name: string,
        componentConfig: ComponentConfig
    ) => void

}

export const useComponentConfigStore = create<State & Action>((set) => ({
    //组件配置
    componentConfig: {
        Container: {
            name: 'Container',
            defaultProps: {},
            component: Container
        },
        Button: {
            name: 'Button',
            defaultProps: {
                type: 'primary',
                text: 'Button'
            },
            component: Button
        },
        Page:{
            name: 'Page',
            defaultProps: {},
            component: Page
        }
    },
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}))