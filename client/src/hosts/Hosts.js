import React from "react";
import EmblaCarouselComponent from "./EmblaCarouselComponent";
import '../App.scss'
import DocumentTitle from 'react-document-title';

const Hosts = () => (
  <DocumentTitle title="Hosts page">
    <div className="not-stream-component hosts">
      <h2>hosts</h2>
      <EmblaCarouselComponent>
        <div />
        <div />
        <div />
        <div />
        <div />
      </EmblaCarouselComponent>
    </div>
  </DocumentTitle>
);
export default Hosts;
