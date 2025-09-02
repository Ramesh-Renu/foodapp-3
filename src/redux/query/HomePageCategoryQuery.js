import { gql } from "@apollo/client";

export const GET_HOMEPAGE_CATEGORY = gql`
  query {
  categorys {
    categoryId
    categoryName
    createdAt
    imagedata
    imagename
    imageUrl
   updatedAt
   }
}
`;
