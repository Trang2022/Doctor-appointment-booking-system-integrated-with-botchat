import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ type }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-3RX065706M3469222L5IFM4I",
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      style={{
        label: "subscribe",
      }}
    />
  );
};

export default function App() {
  return (
    <div className="paypal">
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          intent: "subscription",
          vault: true,
        }}
      >
        <h5> Vui lòng thanh toán để nhận đơn thuốc</h5>
        <ButtonWrapper type="subscription" />
      </PayPalScriptProvider>
    </div>
  );
}
