import RouteMap from '../components/journey/RouteMap';
import SchoolCards from '../components/journey/SchoolCards';
import TurningPoint from '../components/journey/TurningPoint';
import Semesters from '../components/journey/Semesters';
import BuildToy from '../components/journey/BuildToy';
import Evolution from '../components/journey/Evolution';
import Skills from '../components/Skills';

export default function JourneyPage() {
  return (
    <>
      <RouteMap />
      <SchoolCards />
      <TurningPoint />
      <Semesters />
      <BuildToy />
      <Skills />
      <Evolution />
    </>
  );
}
