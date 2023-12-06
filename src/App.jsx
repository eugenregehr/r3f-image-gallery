import './App.css'
import Scene from './Scene';
import Navigation from './components/Navigation';

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { title: 'Picture 1', ratio: 1.5, landscape: false, position: [0, 0, 3], rotation: [0, 0, 0], url: pexel(1103970) },

  // Side
  { title: 'Picture 2', ratio: 1.5, landscape: false, position: [2, 0, 2], rotation: [0, 0, 0], url: pexel(1738986) },
  { title: 'Picture 3', ratio: 1.5, landscape: false, position: [-2, 0, 2], rotation: [0, 0, 0], url: pexel(358574) },

  { title: 'Picture 4', ratio: 1.5, landscape: false, position: [2.15, 0, 0], rotation: [0, 0, 0], url: pexel(911738) },
  { title: 'Picture 5', ratio: 1.5, landscape: false, position: [-2.15, 0, 0], rotation: [0, 0, 0], url: pexel(325185) },

  { title: 'Picture 6', ratio: 1.2, landscape: false, position: [1.75, 0, -2], rotation: [0, 0, 0], url: pexel(227675) },
  { title: 'Picture 7', ratio: 1.4, landscape: false, position: [-1.75, 0, -2], rotation: [0, 0, 0], url: pexel(327482) },


  // Back
  { title: 'Picture 8', ratio: 1, landscape: false, position: [-1, 0, -4], rotation: [0, 0, 0], url: pexel(416430) },
  { title: 'Picture 9', ratio: 1.4, landscape: true, position: [1, 0, -4], rotation: [0, 0, 0], url: pexel(310452) },
]

function App() {

  return (
    <>
      <Scene images={images} />
      <Navigation images={images} />
    </>
  )
}

export default App
