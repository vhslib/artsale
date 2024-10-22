import InfoModal from '../components/InfoModal.vue'
import { createApp, h } from 'vue'
import type { ExtractProps } from '../util/extract-props.js'

export async function showInfoModal(args: ExtractProps<typeof InfoModal>) {
    const root = document.getElementById('modal-root')!

    const vnode = h(InfoModal, args)
    const app = createApp(vnode)

    const component = app.mount(root) as InstanceType<typeof InfoModal>

    await component.open()

    app.unmount()
}
