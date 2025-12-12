interface Props {
  student: string
  children: React.ReactNode
  subTitle?: string
}
/** 简单父子组件 通信传值 */
export default function Child(props: Props) {
  return (
    <div>
      {props.children}
      <p>hello, {props.student}</p>
    </div>
  )
}
