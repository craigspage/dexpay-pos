import gql from 'graphql-tag';
import { indexOf } from 'lodash';

const resolvers = {
  Mutation: {
    updateCurrency: (_, variables, { cache }) => {
      // update cache
      cache.writeData({ data: { currency: variables.currency } });

      return variables.currency;
    },
    toggleAcceptedTokens: (_, variables, { cache }) => {
      const { token, isAccepted } = variables;

      const data = cache.readQuery({
        query: gql`
          query AcceptedTokens {
            acceptedTokens @client
          }
        `
      });
      const tokens = data.acceptedTokens;

      if (isAccepted) {
        tokens.push(token);
      } else {
        const tokenIndex = indexOf(tokens, token);
        tokens.splice(tokenIndex, 1);
      }
      // update cache
      cache.writeData({ data: { acceptedTokens: tokens } });

      return tokens;
    }
  }
};

export default resolvers;