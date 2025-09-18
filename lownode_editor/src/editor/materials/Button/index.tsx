import { Button as AntdButton } from 'antd';
//约束button 类型只能是"link" | "default" | "primary" | "dashed" | "text"几种
import type { ButtonType } from 'antd/es/button'

export interface ButtonProps {//将组件的内部向外暴露
    type: ButtonType;
    text: string;
}

const Button = ({ type, text }: ButtonProps) => {
    return (
        <AntdButton type={type}>
            {text}
        </AntdButton>
    )
}

export default Button;