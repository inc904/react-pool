import Card from '@/components/card'

export default function CardPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Card />
        <Card />
        <Card />
      </div>
    </>
  )
}
