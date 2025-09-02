import { gql } from "@apollo/client";

export const GET_GST_SLAB = gql`
  query {
    gstSlabBy {
      createdAt
      gstSlabId
      rate
      slabName
      updatedAt
    }
  }
`;