import React from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";

class ProjectsListTable extends React.Component {
  render() {
    const { bodyData } = this.props;
    return (
      <div className="table-responsive">
        <div className="d-flex justify-content-between">

        <div className="filter-row pb-2 ">
        Show Entries   &nbsp; &nbsp;
        <select> 
        <option value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
      </select>
        </div>
        <div className="form-group d-flex align-items-center">
          <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                <input type="text" className="form-control" placeholder="" />
        </div>
        </div>

        <table className="table m-b-0 ">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Registered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bodyData.map((data, i) => {
              return (
                <tr key={"dihf" + i}>
                  <td>
                    John Doe
                  </td>
                  <td className="project-title">
                    <h6>
                      <a>johndoe@gmail.com</a>
                    </h6>
                    <small>Created {data.date}</small>
                  </td>
                  <td>
                   Nepal
                  </td>
                  <td>
                  Created {data.date}
                  </td>
                  <td className="project-actions">
                    <a className="btn btn-outline-secondary mr-1">
                      <i className="icon-eye"></i>
                    </a> &nbsp;
                    <a className="btn btn-outline-secondary">
                      <i className="icon-trash"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-between pt-4 mr-4">

<div className="filter-row pt-2">
{/* Showing 1 to 51 of 184 entries */}
</div>
<div className="form-group d-flex align-items-center">
<ul id="pagination">
    <li><a href="#">«</a></li>
    <li><a href="#">1</a></li>
    <li><a href="#" className="">2</a></li>
    <li><a href="#">3</a></li>
    <li><a href="#">4</a></li>
    <li><a href="#">5</a></li>
    <li><a href="#">6</a></li>
    <li><a href="#">7</a></li>
    <li><a href="#">»</a></li>
  </ul> 
</div>
</div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(ProjectsListTable);
