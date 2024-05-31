import React from 'react'
import coming from '../../../../assets/images/comingSoon.png'
import PageHeader from '../../../../components/PageHeader'

export default function ApiLogs() {
  return (
    <>
      <div className="container-fluid"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
      <PageHeader
        HeaderText="API Logs"
        Breadcrumb={[
          { name: "Dashboard", navigate: "" },
          { name: "IoT Dashboard", navigate: "" },
        ]}
      />
        <div className="theme-cyan">
          <div className="error-page-container">
            <img src={coming} alt="404" />
          </div>
        </div>
      </div>
    </>
  )
}
