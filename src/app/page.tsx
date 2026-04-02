import Hero from "./partials/Hero";
import About from "./partials/About";
import Music from "./partials/Music";
import Story from "./partials/Story";
import Marquee from "./partials/Marquee";
import Preloader from "./components/Preloader";
import Introduce from "./partials/Introduce";
import Asap from "./partials/Asap";
export default function Index() {
  return (
    <main className="">
      {/* <Preloader /> */}
      <Hero />
      <Marquee />
      <About />
      <Music />
      <Story />
      <div className="h-[70vh] w-full bg-linear-to-b from-black to-white"></div>
      <Asap />
    </main>
  );
}