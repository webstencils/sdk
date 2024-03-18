# NodeTree

`Type`

A data structure that represents the hierarchy of a React Element instances as tree of Nodes.

## Reference

### Properties

- `rootNodeId` **NodeId**: The id of the root Node in the tree
- `nodes` **Record<NodeId, Node>** Nodes

## Example

```jsx
<div>
  <h2>Hello</h2>
  <h2>World</h2>
</div>
```

The NodeTree of the div is:

```json
{
  "rootNodeId": "node-a",
  "nodes": {
    "node-a" : {
      "data": {
        "type": "div",
        "nodes": ["node-b", "node-c"]
      }
    },
    "node-b" : {
      "data": {
        "type": "h2",
        "props": { "children": "Hello" }
      }
    },
    "node-c" : {
      "data": {
        "type": "h2",
        "props": { "children": "World" }
      }
    }
  }
}
```
