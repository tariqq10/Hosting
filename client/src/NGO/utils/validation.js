export const validateDonation = (data) => {
    const errors = {};
    if (!data.amount || data.amount <= 0) errors.amount = 'Amount should be positive';
    if (!data.donor) errors.donor = 'Donor name is required';
    return errors;
  };
  