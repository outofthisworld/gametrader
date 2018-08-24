
babel_node=$(pwd)/node_modules/babel-cli/bin/babel-node.js
script_path=src/util/generate_graphql.js 

exec 1> graph.gql
exec 2> error.gql

node $babel_node $script_path Game Game &&
node $babel_node $script_path Service Service &&
node $babel_node $script_path User User &&
node $babel_node $script_path GameItem GameItem