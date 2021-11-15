import { useEffect, useState } from "react";

const useOrder = (email) => {
  const [orders, setOrders] = useState([]);

  const url =  email != null ? `/user?email=${email}` : "/"
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/orders${url}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [url]);

  return [orders, setOrders];
};

export default useOrder;
