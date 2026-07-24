import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Mood from '@/components/Mood';
import Menu from '@/components/Menu';
import Events from '@/components/Events';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mood />
        <Menu />
        <Events />
      </main>
      <Footer />
    </>
  );
}
