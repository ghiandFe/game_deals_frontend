import { gql } from '@apollo/client';


export const ALL_DEALS_QUERY = gql`
  query deals(
    $storeId: Int
    $priceLower: Int
    $priceHigher: Int
    $orderBy: String
    $offset: Int
    $limit: Int
  ) {
    deals(
      storeId: $storeId
      priceLower: $priceLower
      priceHigher: $priceHigher
      orderBy: $orderBy
      offset: $offset
      limit: $limit
    ) {
      id
      title
      salePrice
      normalPrice
      imgUrl
      headerImg
      store {
        id
      }
    }
  }
`;


export const DEAL_DETAIL_QUERY = gql`
  query deal($dealId: String!) {
    deal(dealId: $dealId) {
      id
      title
      salePrice
      normalPrice
      savings
      dealRating
      ratingText
      releaseDate
      imgUrl
      headerImg
      store {
        id
        name
      }
    }
  }
`;