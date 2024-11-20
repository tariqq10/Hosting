import React from 'react';
import Button from '../UI/Button';

const RequestRow = ({ request }) => {
  const handleApprove = () => {
    console.log(`Approving request for ${request.ngoName}`);
  };

  const handleReject = () => {
    console.log(`Rejecting request for ${request.ngoName}`);
  };
 
  return (
    <tr>
      <td>{request.ngoName}</td>
      <td>${request.amountRequested}</td>
      <td>{request.reason}</td>
      <td>{request.category}</td>
      <td>{request.requestDate}</td>
      <td>
        <Button className="btn btn-success btn-sm me-2" label="Approve" onClick={handleApprove} />
        <Button className="btn btn-danger btn-sm" label="Reject" onClick={handleReject} />
      </td>
    </tr>
  );
};

export default RequestRow;
// 31