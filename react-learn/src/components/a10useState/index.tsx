import { useState } from 'react'

export default function UseStatePage() {
  console.log('hello')
  const cat = { name: 'tom', age: 3 }
  const [catInfo, setCatInfo] = useState(cat)
  console.log('catInfo ===', cat, catInfo, cat === catInfo)
  const [obj, setObj] = useState({ name: 'test', age: 10 })
  const [school, setSchool] = useState(() => {
    const _date = new Date()
    const date =
      _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate()
    return {
      date,
      name: 'XingHua'
    }
  })
  const handleChangeName = () => {
    //  1. 传递完整对象
    // setObj({ name: 'test2', age: 20 })
    // 2. 接受函数，拿到 上次的值， 进行修改
    // setObj((pre) => ({ ...pre, name: 'test2' }))
    // 3. 在上一次的值的基础上修改
    setObj({ ...obj, name: 'test2' })
    // ❌ 直接 传递赋值 属性的对象，会把原对象修改覆盖
    // setObj({ name: 'test2' })
  }

  const handleChangeSchool = () => {
    // 使用 展开修饰符 修改对象
    // setSchool({ ...school, name: 'Beijing University' })
    // 使用 Object.assign 修改对象
    setSchool(Object.assign({}, school, { name: 'Beijing University' }))
  }

  //   更新机制
  const [index, setIndex] = useState(0)
  const handleClickIndex = () => {
    setIndex(index + 1)
    // 打印 0,  正常编写的代码是 同步的， 所以会限制性，而 set 函数是异步的，所以后执行，这么做是为了性能优化，因为我们要的是结果而不是过程
    console.log('index -1:', index)

    /* 内部机制 */
    // 当我们多次以相同的操作更新状态时，react 会进行比较，如果值相同，则会屏蔽后续的更新行为，自带 ·防抖· 功能，防止频繁的相同更新
    setIndex(index + 1)
    console.log('index -2:', index) //  打印是 0， 页面更新值 1
    setIndex(index + 1)
    console.log('index -3:', index) //   打印是 0， 页面更新值 1
    // 所以，如果需要多次更新，则应该使用函数，拿到上一次的值，进行修改，这样 react 才能拿到最新的值
    setIndex((pre) => pre + 1)
    console.log('index -4:', index) // 0 , 打印是0 ，页面上的值 2
    setIndex((pre) => pre + 1)
    console.log('index -5:', index) // 0  打印是 0， 页面更新值 3
  }

  return (
    <div>
      <h1>UseStatePage</h1>
      <p>name: {obj.name}</p>
      <p>age: {obj.age}</p>
      <button onClick={handleChangeName}>changePersonName</button>
      <p>school name: {school.name}</p>
      <p>time: {school.date}</p>
      <button onClick={handleChangeSchool}>changeSchoolName</button>
      <h2>探寻useState更新机制</h2>
      <p>{index}</p>
      <button onClick={handleClickIndex}>changeIndex</button>
    </div>
  )
}
