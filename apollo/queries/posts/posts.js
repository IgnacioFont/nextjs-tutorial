import gql from "graphql-tag";

const POSTS_QUERY = gql`
  query Posts {
    posts {
      Title
    }
  }
`;

export default POSTS_QUERY;