import { SlideButtonR } from "@components/SlideButton"

export default function Home() {
  return (
    <div>
      <h1>Welcome to <span className="bwgradient">brainwave</span>!</h1>
      <div className='indent'>
        <p className="fs36">Targeted individualized activities designed by <span className="bwgradient">you</span>.</p>
        <h2>What is Brainwave?</h2>
        <p>Brainwave allows educators to easily create learning activities for their students, and provides a comprehesible environment for students to learn.</p>
        <SlideButtonR to="about" title="Learn more about Brainwave"/>
        <SlideButtonR to="create" title="Start creating"/>
      </div>
    </div>
  )
}
