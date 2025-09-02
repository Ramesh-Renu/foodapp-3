import { gql } from '@apollo/client';

export const HANDLE_PAYMENT_MUTATION = gql`
  mutation HandlePayment($input: PaymentInput!) {
    handlePayment(input: $input) {
      amount
    cartId
    orderId
    paymentGateway
    paymentMethodId
    razorpayOrderId
    razorpayPaymentId
    razorpayRefundId
    status
    transactionDate
    transactionId
    transactionType
    }
  }
`;

export const COMPLETE_PAYMENT_MUTATION = gql`
  mutation CompletePayment($input: CompletePaymentInput!) {
    completePayment(input: $input) {
      status
      transactionId
    }
  }
`;