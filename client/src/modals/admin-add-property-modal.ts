import AdminAddPropertyModal from '../components/AdminAddPropertyModal.vue'
import { createApp, h } from 'vue'
import type { ExtractProps } from '../util/extract-props.js'

export async function showAdminAddPropertyModal(args: ExtractProps<typeof AdminAddPropertyModal>) {
    const root = document.getElementById('modal-root')!

    const vnode = h(AdminAddPropertyModal, args)
    const app = createApp(vnode)

    const component = app.mount(root) as InstanceType<typeof AdminAddPropertyModal>

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: { name: string, type: 'OPTION' | 'MULTI_OPTION' } | undefined = await component.open()

    app.unmount()

    return result
}
