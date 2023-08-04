import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrids } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters on</span>
    </h2>
    <p>Ready to slice you up!</p>
    {!slicemasters && <LoadingGrid count={4} />}

    {slicemasters && !slicemasters.length && (
      <p>No one is working right now!</p>
    )}

    {slicemasters && slicemasters.length && <ItemGrid items={slicemasters} />}
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Host slices on</span>
    </h2>
    <p>EAT! EAT! EAT!</p>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices.length && <p>No slice left in case!</p>}
    {hotSlices && hotSlices.length && <ItemGrid items={hotSlices} />}
  </div>
);

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <div className="center">
      <h1>The best slices in town!</h1>
      <p>Hey I'm another element</p>
      <HomePageGrids>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrids>
    </div>
  );
}
