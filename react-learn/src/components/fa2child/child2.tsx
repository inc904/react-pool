interface Props {
  student: string
  children: React.ReactNode
}

const defaultProps = {
  subTitle: 'default props',
}
/** 父子组件传值， 子组件设置默认值 */
export default function Child(props: Props) {
  const { student, children, subTitle } = { ...defaultProps, ...props }
  return (
    <div>
      {children}
      <h2>{subTitle}</h2>
      <p>hello, {student}</p>
    </div>
  )
}
