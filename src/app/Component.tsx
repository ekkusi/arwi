import { FragmentType, graphql, useFragment } from "@/gql";

// export const Component_TodoListFragment = graphql(/* GraphQL */ `
//   fragment Component_TodoList on TodoList {
//     id
//     title
//     updatedAt
//     todos(first: 5) {
//       edges {
//         node {
//           title
//           id
//         }
//       }
//     }
//   }
// `);

// type ComponentProps = {
//   todoList: FragmentType<typeof Component_TodoListFragment>;
// };

function Component() {
  // const todoList = useFragment(Component_TodoListFragment, todoListProp);
  return (
    <div>
      {/* <h2>{todoList.title}</h2>
      <p>Todos:</p>
      {todoList.todos?.edges?.map((todoEdge) => (
        <div key={todoEdge?.node.id}>
          <p>{todoEdge?.node.title}</p>
        </div>
      ))} */}
    </div>
  );
}

export default Component;
