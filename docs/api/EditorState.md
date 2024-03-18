# EditorState

`Type`

## Reference

### Properties

- `nodes` **Record<NodeId, Node>**: A map of all the Nodes in the editor
- `events` **Object**
  - `selected` **Set\<NodeId>**
  - `hovered` **Set\<NodeId>**
  - `dragged` **Set\<NodeId>**
- `options` **Object** (can be specified as props in the [`<Editor />`](Editor.md))
  - `resolver` **Map<string, React.ComponentType>**: A map of User Components that will be used in the editor
  - `enabled?` **boolean**: Optional. If set to false, all editing capabilities will be disabled
  - `indicator` **Object**
    - `success` **string**: Color to use when the user hovers over a droppable location
    - `error` **string**: Color to use when the user hovers over a non-droppable location
    - `transition` **string**: CSS transition to use for when the Indicator moves around
    - `thickness` **number**: Thickness of the Indicator
  - `onRender?` **React.ComponentType<{element: React.ReactElement}>**: Optional. Specify a custom component to render every User Element in the editor.
  - `onNodesChange?` **() => void**: Optional. A callback method when the values of the nodes in the state changes
