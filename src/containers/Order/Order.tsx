import {type FormEvent} from 'react';

const Order = () => {
  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="row mt-5">
      <div className="col-8 m-auto">
        <form onSubmit={onFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Client name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;