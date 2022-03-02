export function onEdit (transition, EDITING) {
  transition(EDITING)
}

export function onSaveEdit (transition, SHOW) {
  transition(SHOW)
}

export function onConfirmDelete (transition, CONFIRM) {
  transition(CONFIRM)
}

export function onCancelDelete (transition, SHOW) {
  transition(SHOW)
}
