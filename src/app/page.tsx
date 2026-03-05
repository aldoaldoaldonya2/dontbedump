import Hero from "./partials/Hero";
import About from "./partials/About";
import Music from "./partials/Music";
import Story from "./partials/Story";
import Preloader from "./components/Preloader";

export default function Index() {
  return (
    <main className="">
      {/* <Preloader /> */}
      <Hero />
      <About />
      <Music />
      <Story />
    </main>
  );
}