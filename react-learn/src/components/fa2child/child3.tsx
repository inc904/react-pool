interface Props {
  student: string
  children: React.ReactNode
  subTitle?: string
  change: (str: string) => void
}
/* 父子组件： 子组件触发父组件方法传值给父组件 */
export default function Child(props: Props) {
  const handleClick = () => {
    props.change('new subTitle')
  }
  return (
    <div>
      {props.children}
      <h2>subTitle:{props.subTitle}</h2>
      <p>hello, {props.student}</p>
      <button onClick={handleClick}>更新subTitle</button>
    </div>
  )
}
