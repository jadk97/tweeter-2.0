import _ from "lodash";

const flattenTweets = (data) => data.map(d => [_.omit(d, "replies"), ...flattenTweets(d.replies)]).flat();

export default flattenTweets;