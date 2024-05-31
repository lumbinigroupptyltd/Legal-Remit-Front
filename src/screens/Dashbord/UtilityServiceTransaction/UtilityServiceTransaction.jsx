import React, { useState } from 'react'
import PageHeader from '../../../components/PageHeader'
import Pagination from '@mui/material/Pagination';
import { CommonConstants } from '../../../Constants/common.constants';
import Form from 'react-bootstrap/Form';
import './UtilityServiceTransaction.scss'
import Page404 from '../../Auth/Page404';
import coming from '../../../assets/images/comingSoon.png'

export default function UtilityServiceTransaction() {
  const [enabled, setEnabled] = useState(false);
  const [CountPage, SetCountPage] = useState(0);
  const [Page, SetPage] = useState(1);
  const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
  const [numItems, SetNumItems] = useState(0);
  const [Search, SetSearch] = useState('');


  const handleToggleEnabled = () => {
    setEnabled(true);
  };
  const handleToggleDisabled = () => {
    setEnabled(false)
  }
  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);

    }

  };
  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };
  const handleSearch = (e) => {
    SetSearch(e.target.value);
    SetPage(1);
  }
  return (
    <>
      <div className="container-fluid"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <PageHeader
          HeaderText="Utility Service Management"
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
