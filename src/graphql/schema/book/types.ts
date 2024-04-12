export const BookTypes = `#graphql
  type Book {
    """The __title__ of the book"""
    title: String
    """The __author__ of the book"""
    author: String
  }

  type Query {
    """Get a list of books"""
    books: [Book]
  }
`;
