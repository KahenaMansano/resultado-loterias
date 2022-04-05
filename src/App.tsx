import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [pageCode, setPage] = useState('2359')
  const [color, setColor] = useState('#6BEFA3')
  const [name, setName] = useState('Mega-Sena')
  const [results, setResults] = useState({
    id: '2359',
    loteria: 0,
    numeros: Array(6),
    data: '2022-04-02T01:01:36.515Z'
  })
  const [newDate, setNewDate] = useState()

  // if (pageCode === '2359') {
  //   setColor('#6BEFA3')
  //   setName('Mega-Sena')
  // }

  if (pageCode === '5534') {
    setColor('#8666EF')
    setName('Quina')
  }

  function update(event) {
    const select = event.target.value
    setPage(select)
  }

  useEffect(() => {
    console.log('Entrou no Request')
    async function searchData() {
      const request = await axios.get(
        // `https://brainn-api-loterias.herokuapp.com/api/v1/concursos/${pageCode}`
        'https://brainn-api-loterias.herokuapp.com/api/v1/concursos/2359'
      )
      setResults(request.data)
      console.log(request.data, 'Request feito')

      return request
    }

    searchData()
  }, [pageCode])

  useEffect(() => {
    function isoFormatDMY() {
      let date = results.data
      let dateRange = moment.utc(date).format('YYYY-MM-DD')
      alert(new Date(dateRange))
    }

    // const date = results.data
    // function isoFormatDMY(date) {
    //   function pad(n) {
    //     return (n < 10 ? '0' : '') + n
    //   }
    //   return (
    //     pad(date.getUTCDate()) +
    //     '/' +
    //     pad(date.getUTCMonth() + 1) +
    //     '/' +
    //     date.getUTCFullYear()
    //   )
    // }
    // console.log(isoFormatDMY(), 'conversão data')
    isoFormatDMY()
  }, [results])

  var s = '2014-11-03T19:38:34.203Z'
  var date = parseISOString(s)

  console.log(isoFormatDMY(date))

  return (
    <div style={{ backgroundColor: color, padding: '0', margin: '0' }}>
      <select id="page" onChange={update}>
        <option defaultValue=""> </option>
        <option value="2359">Mega-Sena</option>
        <option value="5534">Quina</option>
        <option value="2200">Loto Fácil</option>
        <option value="2167">Loto Mania</option>
        <option value="1622">Time Mania</option>
        <option value="440">Dia de sorte</option>
      </select>
      <h1>{name}</h1>

      <div>
        {results.numeros.map(number => {
          return <div>{number}</div>
        })}
      </div>
      <h2>Concurso</h2>
      <p>{results.id}</p>
      <p>{results.data}</p>
    </div>
  )
}

export default App
