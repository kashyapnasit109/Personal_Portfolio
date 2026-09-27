import WorkIndex from '../components/work/WorkIndex';
import Work from '../components/Work';
import Lab from '../components/Lab';
import StackXray from '../components/work/StackXray';
import Archive from '../components/Archive';

export default function WorkPage() {
  return (
    <>
      <WorkIndex />
      <Work bare />
      <Lab />
      <StackXray />
      <Archive />
    </>
  );
}
