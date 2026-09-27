import ContactHero from '../components/contact/ContactHero';
import Contact from '../components/Contact';
import VelocityMarquee from '../components/VelocityMarquee';

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Contact />
      <VelocityMarquee words={['Hello', 'Namaste', 'Kem cho']} />
    </>
  );
}
