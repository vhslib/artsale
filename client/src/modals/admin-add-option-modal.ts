import AdminAddOptionModal from '../components/AdminAddOptionModal.vue'
import { createApp, h } from 'vue'
import type { ExtractProps } from '../util/extract-props.js'

export async function showAdminAddOptionModal(args: ExtractProps<typeof AdminAddOptionModal>) {
    const root = document.getElementById('modal-root')!

    const vnode = h(AdminAddOptionModal, args)
    const app = createApp(vnode)

    const component = app.mount(root) as InstanceType<typeof AdminAddOptionModal>

    // wtf eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const option: string | undefined = await component.open()

    app.unmount()

    return option
}
