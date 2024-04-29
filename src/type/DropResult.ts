type DraggableId = string;
type DroppableId = string;

type DraggableRubric = {
  draggableId: DraggableId;
  type: string;
  source: DraggableLocation;
};

type MovementMode = "FLUID" | "SNAP";

type DragStart = DraggableRubric & {
  mode: MovementMode;
};

export type DraggableLocation = {
  droppableId: DroppableId;
  index: number;
};

type Combine = {
  draggableId: DraggableId;
  droppableId: DroppableId;
};

type DragUpdate = DragStart & {
  // may not have any destination (drag to nowhere)
  destination: DraggableLocation | null | undefined;
  // populated when a draggable is dragging over another in combine mode
  combine: Combine | null | undefined;
};

type DropReason = "DROP" | "CANCEL";

// published when a drag finishes
export type DropResult = DragUpdate & {
  reason: DropReason;
};
