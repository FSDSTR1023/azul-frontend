export const RENTED = {
  value: 'RENTED',
  text: 'Alquilada',
  color: '#A6FFC9'
}
export const REPAIRING = {
  value: 'REPAIRING',
  text: 'En reparación',
  color: '#FFC1A6'
}
export const NOTRENTED = {
  value: 'NOTRENTED',
  text: 'No alquilada',
  color: '#FFF6A6'
}

export const machineCategories = ['Excavadora', 'Retroexcavadora', 'Cargadora', 'Tractor', 'Camión', 'Grúa', 'Montacargas', 'Taladro', 'Martillo', 'Otro']

export const machineStateType = [RENTED, REPAIRING, NOTRENTED]

export const machineStateValue = [
  {
    value: RENTED.value,
    text: RENTED.text
  },
  {
    value: REPAIRING.value,
    text: REPAIRING.text
  },
  {
    value: NOTRENTED.value,
    text: NOTRENTED.text
  }

]
