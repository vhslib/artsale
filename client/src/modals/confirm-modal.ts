import ConfirmModal from '../components/ConfirmModal.vue'
import { createApp, h } from 'vue'
import type { ExtractProps } from '../util/extract-props.js'

export async function showConfirmModal(args: ExtractProps<typeof ConfirmModal>) {
    const root = document.getElementById('modal-root')!

    const vnode = h(ConfirmModal, args)
    const app = createApp(vnode)

    const component = app.mount(root) as InstanceType<typeof ConfirmModal>

    // wtf eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const success: boolean = await component.open()

    app.unmount()

    return success
}
