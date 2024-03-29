# Node

`Type`

## Reference

### Properties

- `id` **NodeId**: A randomly generated unique id
- `data` **Object**
  - `props` **Record<string, any>**: The current props for the user element
  - `type` **React.ElementType**: The type of User Element
  - `name` **string**: Name of the User Element
  - `displayName` **string**: By default, it will be set to the same value as 'name'. But User Components have the ability to opt for a more user-friendly name by setting the `craft.name` property
  - `isCanvas` **boolean**: True if the current Node is a Canvas Node
  - `parent` **NodeId**: The parent Node's id
  - `nodes` **NodeId[]**: The id of the child Nodes
  - `hidden` **boolean**
  - `custom` **Record<String, any>**: Custom properties stored in the Node
  - `linkedNodes` **Record<String, NodeId>**: A map of Nodes defined inside the User Component. Only applicable if the current Node's User Element is a Component which contains &lt;Element /&gt; inside its render
- `events` **Object**
  - `selected` **boolean**: Is true if the user element is clicked
  - `hovered` **boolean**: Is true if the user element is being hovered
  - `dragged` **boolean**: Is true if the user element is being dragged
- `dom` **HTMLElement | null**: The DOM of the current Node's User Element. For User Components, this is defined by the `connect` connector
- `related` **Record<String, React.ElementType>**: A map of React Components that shares the current Node context
- `rules` **Object**
  - `canDrag` **(currentNode: Node) => boolean**: Specifies if the current Node can be dragged. Applicable only if the current Node is a direct child of a Canvas Node
  - `canDrop` **(targetNode: Node, currentNode: Node) => boolean**: Specifies if the current Node that is being dragged can be dropped in its target. Applicable only if the current Node is a direct child of a Canvas Node
  - `canMoveIn` **(incomingNodes: Node[], currentNode: Node, helpers: NodeHelpers) => boolean**: Specifies if an array of incoming Nodes can be dropped into the current component. Applicable only to components whose corresponding Node is a Canvas 
  - `canMoveOut` **(outgoingNodes: Node[], currentNode: Node, helpers: NodeHelpers) => boolean**: Specifies if an array of child Nodes can be dragged out of the current component. Applicable only to components whose corresponding Node is a Canvas

## Examples

### Basics

#### Simple elements

Example

```jsx
<div style={{ background: "#eee" }}>Hello</div>
```

which gives the following tree:

```json
{
  "node-a": {
    "id": "node-a",
    "data": {
      "type": "div",
      "props": {
        "style": {
          "background": "#eee"
        },
        "children": "Hello"
      },
      "name": "div",
      "displayName": "div",
      "isCanvas": false
    }
  }
}
```

#### User Component

Definition

```jsx
const Container = () => {}

Container.craft = {
  name: "SimpleContainer"
};
```

Usage

```html
<Container bg="#fff" />
```

Node tree:

```json
{
  "node-b": {
    "id": "node-b",
    "data": {
      "type": "Container",
      "props": {
        "bg": "#fff"
      },
      "name": "Container",
      "displayName": "SimpleContainer",
      "isCanvas": false
    }
  }
}
```

### Child Nodes

Nodes that are referenced in the parent Node's `data.nodes` property. 
These nodes are rendered in the parent User Component's `children` prop

```html
<Container bg="#fff">
  <h2>Hello</h2>
</Container>
```

Node tree:

```json
{
  "node-a": {
    "id": "node-a",
    "data": {
      "type": "Container",
      "props": {},
      "nodes": ["node-b"]
    }
  },

  "node-b": {
    "id": "node-b",
    "data": {
      "type": "h2",
      "props": {},
      "parent": "node-a"
    }
  }
}
```

### Linked nodes

Nodes that are linked to a parent Node via an arbitrary `id`

Definition:

```jsx
const TextEditable = () => {};

const Container = () => {
  return (
    <div>
      <Element id="header" is={TextEditable} text="Header" />
    </div>
  )
}
```

Usage

```html
<Container bg="#fff" />
```

Node tree:

```json
{
  "node-a": {
    "id": "node-a",
    "data": {
      "type": "Container",
      "props": {},
      "linkedNodes": {
        "header": "node-b"
      }
    }
  },

  "node-b": {
    "id": "node-b",
    "data": {
      "type": "TextEditable",
      "props": {},
      "parent": "node-a"
    }
  }
}
```

### Nodes with Custom properties

Definition

```jsx
const Container = () => {/*...*/}

Container.craft = {
  custom: { // default custom values
    toSaveInDatabase: false
  }
};
```

Usage

```html
<Element is={Container} bg="#fff" custom={{ toSaveInDatabase: true}} />
```

Node tree:

```json
{
  "node-b": {
    "id": "node-b",
    "data": {
      "props": {
        "bg": "fff"
      },
      "custom": {
        "toSaveInDatabase": true
      }
    }
  }
}
```
