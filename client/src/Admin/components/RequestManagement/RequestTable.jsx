import React from 'react';
import RequestRow from './RequestRow';

const RequestTable = ({ requests }) => {
  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>NGO Name</th>
          <th>Amount Requested</th>
          <th>Reason</th>
          <th>Category</th>
          <th>Request Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request, index) => (
          <RequestRow key={index} request={request} />
        ))}
      </tbody>
    </table>
  );
};

export default RequestTable; 
