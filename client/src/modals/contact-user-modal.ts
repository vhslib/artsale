import ContactUserModal from '../components/ContactUserModal.vue'
import { createApp, h } from 'vue'

export async function showContactUserModal() {
    const root = document.getElementById('modal-root')!

    const vnode = h(ContactUserModal)
    const app = createApp(vnode)

    const component = app.mount(root) as InstanceType<typeof ContactUserModal>

    // wtf eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const message: string | undefined = await component.open()

    app.unmount()

    return message
}
