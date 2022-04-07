import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import './App.css'

interface RequestResponse {
  id: string
  data: string
  numeros: Array<string>
}

function App() {
  const [pageCode, setPage] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>('#EFEFEF')
  const [name, setName] = useState<string | null>(null)
  const [results, setResults] = useState<RequestResponse | null>(null)
  const [newDate, setNewDate] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  if (name === 'MEGA-SENA' && pageCode !== '2359') {
    setColor('#6BEFA3')
    setPage('2359')
  }

  if (name === 'QUINA' && pageCode !== '5534') {
    setColor('#8666EF')
    setPage('5534')
  }

  if (name === 'LOTOFACIL' && pageCode !== '2200') {
    setColor('#DD7AC6')
    setPage('2200')
  }

  if (name === 'LOTOMANIA' && pageCode !== '2167') {
    setColor('#FFAB64')
    setPage('2167')
  }

  if (name === 'TIMEMANIA' && pageCode !== '1622') {
    setColor('#5AAD7D')
    setPage('1622')
  }

  if (name === 'DIA DE SORTE' && pageCode !== '440') {
    setColor('#BFAF83')
    setPage('440')
    console.log('setou cor e código da página')
  }

  function update(e: React.ChangeEvent<HTMLSelectElement>) {
    const select = e.target.value
    setName(select)
    console.log(select, 'setou no nome')
  }

  useEffect(() => {
    if (!name) return

    console.log('Entrou no Request')

    async function searchData() {
      const request = await axios.get(
        `https://brainn-api-loterias.herokuapp.com/api/v1/concursos/${pageCode}`
      )
      setResults(request.data)
      setLoading(false)
      console.log(request.data, 'Request feito')

      return request
    }

    searchData()
  }, [pageCode])

  useEffect(() => {
    function isoFormatDMY() {
      if (!results) return
      let date = results.data
      let dateRange = moment.utc(date).format('YYYY-MM-DD')
      setNewDate(dateRange)
    }

    isoFormatDMY()
  }, [results])

  return (
    <div className="Page" style={{ backgroundColor: `${color}` }}>
      <select id="page" onChange={update} className="Input">
        <option defaultValue="">Selecione o concurso:</option>
        <option value="MEGA-SENA">MEGA-SENA</option>
        <option value="QUINA">QUINA</option>
        <option value="LOTOFACIL">LOTOFACIL</option>
        <option value="LOTOMANIA">LOTOMANIA</option>
        <option value="TIMEMANIA">TIMEMANIA</option>
        <option value="DIA DE SORTE">DIA DE SORTE</option>
      </select>

      {!loading && results ? (
        <div>
          <div className="GridWeb">
            <div className="Concurso">
              <div className="NameLogo">
                <img
                  src="https://i.postimg.cc/8c1nfjfM/Logo-Sena.png"
                  alt="Logo mega-sena"
                />
                <h1 className="TxtLogo">{name}</h1>
              </div>

              <div className="Info">
                <h2 className="InfoTxt">Concurso</h2>
                <p className="InfoIdDate">
                  {results.id} - {newDate}
                </p>
              </div>
            </div>

            <div className="Numbers">
              {results.numeros.map(number => {
                return (
                  <div key={number} className="Number">
                    {number}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="Footer">
            <p>
              Este sorteio é meramente ilustrativo e não possui nenhuma ligação
              com a CAIXA.
            </p>
          </div>
        </div>
      ) : (
        <div className="loadingWeb">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
