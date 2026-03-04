import Hero from "./partials/Hero";

export default function Index() {
  return (
    <main className="">
      <Hero />
      <div id="about" className="h-screen w-full bg-white"></div>
      <div id="music" className="h-screen w-full bg-gray-500"></div>
      <div id="story" className="h-screen w-full bg-white"></div>
      <div className="h-screen w-full bg-gray-500"></div>
    </main>
  );
}