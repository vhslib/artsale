import type { AllowedComponentProps, VNodeProps } from 'vue'

export type ExtractProps<T extends abstract new (...args: any[]) => any> =
    Omit<InstanceType<T>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
