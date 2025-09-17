import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import {Header} from './components/Header'
import {Material} from './components/Material'
import {EditorArea} from './components/EditorArea'
import {Setting} from './components/Setting'

export default function LowcodeEditor() {
    return (
        <div className="h-[100vh] flex flex-col">
            <div className="h-[60px] flex items-center border-b-[1px] border-gray-300">
                <Header />
            </div>
            <Allotment>
                <Allotment.Pane preferredSize={300} minSize={200} maxSize={400}>
                    <Material />
                </Allotment.Pane>
                <Allotment.Pane preferredSize={500} minSize={400}>
                    <EditorArea />
                </Allotment.Pane>
                <Allotment.Pane preferredSize={300} minSize={200} maxSize={400}>
                    <Setting />
                </Allotment.Pane>
            </Allotment>
        </div>
    )
}