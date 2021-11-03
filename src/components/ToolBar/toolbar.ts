interface Toolbar {
  title: string
  id: string
  icon: string
}

const tools: Toolbar[] = [
  {
    title: 'تصاویر',
    id: 'ui.right_sidebar.children.image',
    icon: 'ion:add-outline',
  },
  {
    title: 'متن',
    id: 'ui.right_sidebar.children.text',
    icon: 'ion:text-outline',
  },
  {
    title: 'اشکال',
    id: 'ui.right_sidebar.children.shape',
    icon: 'ion:shapes-outline',
  },
  {
    title: 'قالب',
    id: 'ui.right_sidebar.children.template',
    icon: 'ion:grid-outline',
  },
  {
    title: 'پس زمینه',
    id: 'ui.right_sidebar.children.background',
    icon: 'ion:image-outline',
  },
  {
    title: 'تغییر سایز',
    id: 'ui.right_sidebar.children.resize',
    icon: 'ion:resize-outline',
  },
]

export default tools
