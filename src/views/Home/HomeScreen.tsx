import * as React from 'react'
import './HomeScreen.css'

interface Props {

}

export const HomeScreen: React.FC<Props> = () => {
  return (
    <div className="DivHome">
      <p>Tela Home</p>
      <div>Aqui vai a tela da home, o nav eh compartilhado entre todas as telas, so esse retangulo aqui que vai alterando de pagina para pagina</div>
    </div>
  )
}

