import React, {useState, useEffect} from 'react'

const TransActionComponent = ({transactions}) => {
  const [search, setSearch] = useState("");
  const [filteredTnx, setFilteredTnx] = useState(transactions)
  const filterTransactions = (search) => {
    if(!search || search === ""){
      setFilteredTnx(transactions)
      return
    }
    const filtered = transactions.filter(t => t.desc.toLowerCase().includes(search.toLowerCase()))
    setFilteredTnx(filtered)
  }

  const changeHandler = (e) => {
    setSearch(e.target.value)
    // Filter
    filterTransactions(search)

  }

  useEffect(() => {
    filterTransactions(search)
  }, [transactions, search])

  if(!transactions.length) return <h2 className='noTransaction'>Add some transactions</h2>

  return (
    <section>
      <input type="text" placeholder='Search for transactions' value={search} onChange={changeHandler} className="search"/>
        {filteredTnx.length ? filteredTnx.map(t => (
          <div className="transaction" key={t.id} style={{borderRight: t.type === "expense" && "4px solid red"}}>
            <span>{t.desc}</span>
            <span>${t.amount}</span>

          </div>
        )) : "No item found"}
    </section>
  )
}

export default TransActionComponent