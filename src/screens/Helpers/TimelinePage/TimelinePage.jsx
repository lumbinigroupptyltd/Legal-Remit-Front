import React from 'react'
import { Timeline, TimelineEvent } from "react-event-timeline";

export default function TimelinePage() {
  return (
   <>
    <div className="p">
    <p>
      <div>

      <div className="stepper-wrapper">
  <div className="stepper-item completed">
    <div className="step-counter stepActive">
      <i className="fa fa-check text-white "/>
    </div>
    <div className="step-name ">Transaction Initiated</div>
  </div>
  <div className="stepper-item completed">
    <div className="step-counter stepActive">
    <i className="fa fa-check text-white"/>
    </div>
    <div className="step-name ">Received to bank</div>
  </div>
  <div className="stepper-item active">
    <div className="step-counter stepActive"><i className="fa fa-circle purpleText" ></i></div>
    <div className="step-name normal text-center">Waiting for bank to process</div>
  </div>
  <div className="stepper-item">
    <div className="step-counter"></div>
    <div className="step-name"></div>
  </div>
  <div className="stepper-item">
    <div className="step-counter"></div>
    <div className="step-name"></div>
  </div>
</div>
      </div>
    </p>
  </div>
   </>
  )
}
