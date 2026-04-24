'use client';

import React, { useState } from 'react';
import { 
    PayPalScriptProvider,
    PayPalButtons, 
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { orderService } from '@/lib/services'; 

const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    intent: "capture",
    components: "buttons",  
    currency: "GBP"
};

const ButtonWrapper = ({ cartItems = [], onSuccess, onError }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const [isCapturing, setIsCapturing] = useState(false);

    if (isPending) {
        return (
            <div className="text-center my-4">
                <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
                <span className="ms-2">Loading PayPal...</span>
            </div>
        ); 
    }

    return (
        <div className="relative">
            {isCapturing && (
                 <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                     <span className="spinner-border text-success"></span>
                 </div>
            )}

            <PayPalButtons
                style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                }}
                
                createOrder={async () => {
                    try {

                        // prepare data for order creation based on cartItems
                        const requestData = cartItems.map( item => ({
                            product_id: item.productId,
                            quantity: item.quantity,
                            variant_id: item.id
                        }));
                        const orderData = await orderService.create({ items: requestData, shipping_method: "standard_shipping" });
                        
                        
                        if (orderData.data.paypalOrderId) {
                            return orderData.data.paypalOrderId;
                        } else {
                            throw new Error(orderData.msg || "Cannot create order");
                        }
                    } catch (error) {
                        console.error("Error creating order:", error);
                        if (onError) onError(error);
                        return null;
                    }
                }}

                onApprove={async (data) => {
                    console.log("Payment approved, capturing order...", data);
                    setIsCapturing(true);
                    try {
                        const captureData = await orderService.capture({ paypal_order_id: data.orderID });

                        if (captureData.data?.status === "COMPLETED" || captureData.code === 0) {
                            if (onSuccess) onSuccess(captureData.data);
                        } else {
                            throw new Error(captureData.msg || "Payment capture failed on server.");
                        }
                    } catch (error) {
                        console.error("Error capturing payment:", error);
                        if (onError) onError(error);
                    } finally {
                        setIsCapturing(false);
                    }
                }}
                
                // 3. Handle Errors
                onError={(err) => {
                    console.error("PayPal Widget Error:", err);
                    if (onError) onError(err);
                    setIsCapturing(false);
                }}
                
                // 4. Handle Cancellations
                onCancel={() => {
                     console.log("User cancelled the payment.");
                     setIsCapturing(false);
                }}
            />
        </div>
    );
};

export default function PaypalBtn({ cartItems = [], onSuccess, onError }) {
    if (cartItems.length === 0) {
        return <div className="alert alert-warning">Cart is empty</div>;
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <PayPalScriptProvider options={paypalOptions}>
                <ButtonWrapper 
                    cartItems={cartItems}
                    onSuccess={onSuccess} 
                    onError={onError} 
                />
            </PayPalScriptProvider>
        </div>
    );
}