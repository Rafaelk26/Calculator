import { useState, FormEvent } from 'react'
import './App.css'
import logoImg from './assets/logo.png'

function App() {

  interface infoProps{
    title: string;
    priceAlcool: number | string,
    priceGasolina: number | string;
  }

  const [gasolinaInput, setGasolinaInput] = useState<number>()
  const [alcoolInput, setAlcoolInput] = useState<number>()
  const [info, setInfo] = useState<infoProps>()

  function calcular(e: FormEvent){
    e.preventDefault();

    const calculo = (alcoolInput / gasolinaInput)

    calculo <= 0.7 ? setInfo({
      title: "Compensa usar Álcool",
      priceGasolina: formatarMoeda(gasolinaInput),
      priceAlcool: formatarMoeda(alcoolInput)
    }) : setInfo({
      title: "Compensa usar Gasolina",
      priceGasolina: formatarMoeda(gasolinaInput),
      priceAlcool: formatarMoeda(alcoolInput)
    });
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",{
      style: 'currency',
      currency: 'BRL'
    })

    return valorFormatado
  }

  return (
    <div>
      {/* Main */}
      <main className="container">
        {/* Image */}
        <img src={logoImg} alt="Logo álcool ou gasolina" />

        <h1 className='title'>Qual é a melhor opção?</h1>

        <form className='form' onSubmit={calcular}>

            {/* Álcool */}

            <label>Álcool (preço por litro):</label>
            <input type="number" placeholder='4,90' min={1} step={.01} className='input' value={alcoolInput} onChange={(e) => setAlcoolInput(Number(e.target.value))} required/>

            {/* Gasolina */}

            <label>Gasolina (preço por litro):</label>
            <input type="number" placeholder='4,50' min={1} step={.01} className='input' value={gasolinaInput} onChange={(e) => setGasolinaInput(Number(e.target.value))} required/>

            <input type="submit" value="Calcular" className='button' />
        </form>

        {/* Result */}

        {info && Object.keys(info).length > 0 && (
          <section className='result'>
            <h2 className='result-title'>{info.title}</h2>
            <span>Álcool: {info.priceAlcool}</span>
            <span>Gasolina: {info.priceGasolina}</span>
          </section>
          )}
      </main>
    </div>
  )
}

export default App
