# NodeHelpers

Methods that helps describe a specified `Node`.

## Usage

### useEditor hook

You can access the NodeHelpers via the `node` query method in the `useEditor` hook.

```ts
import { useEditor } from "@webstencils/core";

const TextComponent = () => {
  const { id } = useNode();
  const { query: {node} } = useEditor();
  const isRoot = node(id).Root();
  const isDraggable = node(id).Draggable();
  // ...
}
```

### User Component rules

NodeHelpers can also be accessed via the last parameter of each User Component rules.

```ts
const MyComp = () => {
};

MyComp.craft = { 
  rules: {
    canDrag: (node: Node, helper: NodeHelpers) => {
      const ancestors = helper(node.id).ancestors();
      // ...
    },
    canMoveIn : (incoming: Node[], self: Node, helper: NodeHelpers) => {
      const isRoot = helper(self.id).isRoot();
      // ...
    },
    canMoveOut: (outgoing: Node[], self: Node, helper: NodeHelpers) => {
      const isDeletable = helper(self.id).isDeletable();
      // ...
    }
  }
}
```

## Methods

### get

`Function`

Get `Node` object from id

#### Returns

- `Node`

### descendants

`Function`

Returns an array of Node ids of all child Nodes of a given Node.

#### Parameters

- `deep` **boolean**: If set to true, retrieve all descendants in nested levels. Default is false
- `includeOnly?` **'childNodes' | 'linkedNodes'**: Get descendants that are either childNodes or linkedNodes. If unset, get all descendants

#### Returns

- `NodeId[]`

```jsx
// The descendants of `div` when deep=false
<div> 
  <h2>Yo</h2>
  <Element is={Container}>
    <h3>Child</h3>
  </Element>
</div>
```

```jsx
// The descendants of `div` when deep=true
<div> 
  <h2>Yo</h2>
  <Element is={Container}>
    <h3>Child</h3>
  </Element>
</div>

const Container = () => {
  return (
    <div>
      <Element id="linked-div">
        <h1>Hello</h1>
      </Element>
    </div>
  )
}
```

```jsx
// The descendants of `div` when deep=true and includeOnly="childNodes" only
<div> 
  <h2>Yo</h2>
  <Element is={Container}>
    <h3>Child</h3>
  </Element>
</div>

const Container = () => {
  return (
    <div>
      <Element id="linked-div">
        <h1>Hello</h1>
      </Element>
    </div>
  )
}
```

```jsx
// The descendants of `div` when deep=true and includeOnly="linkedNodes" only
<div> 
  <h2>Yo</h2>
  <Element is={Container}>
    <h3>Child</h3>
  </Element>
</div>

const Container = () => {
  return (
    <div>
      <Element id="linked-div">
        <h1>Hello</h1>
      </Element>
    </div>
  )
}
```

### ancestors

`Function`

Returns an array of Node ids of all ancestors

#### Returns

- `NodeId[]`

### linkedNodes

`Function`

Returns an array of linked Node ids

#### Returns

- `NodeId[]`

### childNodes

`Function`

Returns an array of child Node ids

#### Returns

- `NodeId[]`

### isRoot

`Function`

Returns `true` if a given Node is the Root Node

#### Returns

- `boolean`

```jsx {5}
const App  = () => {
  return (
    <Editor>
      <Frame>
        <div> {/* true */}
          <div>Yo</div> {/* false */}
          <h2>It's me</h2> {/* false */}
          <Element is={Container}> {/* false */}
            <h3>Child</h3> {/* false */}
          </Element>
        </div>
      </Frame>
    </Editor>
  )
}
```

### isCanvas

`Function`

Check if a given Node is a Canvas

#### Returns

- `boolean`

```jsx {5,8}
const App  = () => {
  return (
    <Editor>
      <Frame>
        <Element canvas> // true
          <div>Yo</div> // false
          <Element is={Container}>It's me</Element> // false
          <Element canvas> // true 
            <h3>Child</h3> // false
          </Element>
        </Element>
      </Frame>
    </Editor>
  )
}
```

### isLinkedNode

`Function`

Check if a given Node is linked to the parent Node via an arbitrary id

#### Returns

- `boolean`

```jsx {17}
const App  = () => {
  return (
    <Editor>
      <Frame>
        <Element canvas> // false
          <div>Yo</div> // false
          <Element is={Hero}>It's me</Element> // false
        </Element>
      </Frame>
    </Editor>
  )
}

const Hero = ({background, title}) => {
  return (
    <div style={{ background }}>
      <Element id="title" is={Text} text={title} /> // true
      ...
    </div>
  )
}
```

### isDeletable

`Function`

A Node may be deleted as long as it is **not** one of the following:

- Root Node
- Top-level Node

#### Parameters

- `node` **Node**: The Node object to check

#### Returns

- `boolean`

```jsx {5,21}
const App  = () => {
  return (
    <Editor resolves={{Container}}>
      <Frame>
        <div> // false
          <div>Yo</div> // true
          <h2>It's me</h2> // true
          <Element canvas> // true 
            <h3>Child</h3> // true
            <Container /> // true
          </Element>
        </div>
      </Frame>
    </Editor>
  )
}

const Container = () => {
  return (
    <div>
      <Element id="main"> // false
        <h2>Hi</h2> // true
      </Element>
    </div>
  )
}
```

### isTopLevelNode

`Function`

A Node is considered top-level if it's one of the following:

- The Root Node
- A linked Node defined inside a User Component


#### Parameters

- `node` **Node**: The Node object to check

#### Returns

- `boolean`

```jsx {5,21,27}
const App  = () => {
  return (
    <Editor resolves={{Container}}>
      <Frame>
        <div> // true
          <div>Yo</div> // false
          <h2>It's me</h2> // false
          <div> // false 
            <h3>Child</h3> // false
            <Container /> // false
          </div>
        </div>
      </Frame>
    </Editor>
  )
}

const Container = () => {
  return (
    <div>
      <Element id="main"> // true
        <h2>Hi</h2> // false
        <Element> // false
          <h2>Hi</h2> // false
        </Element>
      </Element>
      <Element id="secondary"> // true
        <h2>Hi</h2> // false
        <Element> // false
          <h2>Hi</h2> // false
        </Element>
      </Element>
    </div>
  )
}
```

### isParentOfTopLevelNode

`Function`

This returns `true` if a Node's User Component defines a `<Element />` in its render method.

#### Returns

- `boolean`

```jsx {10}
const App  = () => {
  return (
    <Editor resolves={{Container}}>
      <Frame>
        <Element> // false
          <div>Yo</div> // false
          <h2>It's me</h2> // false
          <Element> // false 
            <h3>Child</h3> // false
            <Container /> // true
          </Element>
        </Element>
      </Frame>
    </Editor>
  )
}

const Container = () => {
  return (
    <div>
      <Element id="main"> // false
        <h2>Hi</h2> // false
        <Element> // false
          <h2>Hi</h2> // false
        </Element>
      </Element>
      <Element id="seconday"> // false
        <h2>Hi</h2> // false
        <Element> // false
          <h2>Hi</h2> // false
        </Element>
      </Element>
    </div>
  )
}
```

### isDraggable

`Function`

A Node may be dragged and moved if it satisfies both of the following conditions:

- The Node is an immediate child of a Canvas Node, hence it's draggable
- The Node's `canDrag` rule allows it to be moved 

#### Parameters

- `onError` **(err: string) => void**: Error callback

#### Returns

- `boolean`

### isDroppable

`Function`

Check if a Node is Droppable relative to the target Node.

#### Parameters

- `targetId` **NodeId**: The target Node
- `onError` **(err: string) => void**: Error callback

#### Returns

- `boolean`

#### Example

In the following example, we're checking if our `MyCanvas` component would be able to accept the current selected Node in the editor.

```jsx
const MyCanvas = () => {
  const { id } = useNode();
  const { canWeAcceptTheSelectedNode } = useEditor((state, query) => ({
    canWeAcceptTheSelectedNode: state.events.selected && query.node(id).Droppable(state.events.selected)
  }));
}
```

### toSerializedNode

`Function`

Gets the current Node in it's `SerializedNode` form

#### Returns

- `SerializedNode`

### toNodeTree

`Function`

Gets the current Node and its descendants in its `NodeTree` form

#### Parameters

- `includeOnly?` **'childNodes' | 'linkedNodes'**: Get descendants that are either childNodes or linkedNodes. If unset, get all descendants

#### Returns

- `NodeTree`
