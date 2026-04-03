export const MUSCLE_PAIN_TREE = {
  id: 'muscle-root',
  label: 'Muscle Pain Points',
  children: [
    { id: 'neck', label: 'Neck' },
    {
      id: 'shoulders', label: 'Shoulders',
      children: [
        { id: 'front-delt', label: 'Front Delt' },
        { id: 'side-delt', label: 'Side Delt' },
        { id: 'rear-delt', label: 'Rear Delt' },
      ],
    },
    {
      id: 'arm', label: 'Arm',
      children: [
        { id: 'bicep', label: 'Bicep' },
        { id: 'tricep', label: 'Tricep' },
      ],
    },
    { id: 'forearm', label: 'Forearm' },
    { id: 'hand', label: 'Hand' },
    {
      id: 'midsection', label: 'Midsection',
      children: [
        { id: 'pecs', label: 'Pecs' },
        { id: 'lats', label: 'Lats' },
        { id: 'abs', label: 'Abs' },
        { id: 'obliques', label: 'Obliques' },
      ],
    },
    { id: 'lower-back', label: 'Lower Back' },
    { id: 'glutes', label: 'Glutes' },
    {
      id: 'thighs', label: 'Thighs',
      children: [
        { id: 'quads', label: 'Quads' },
        { id: 'hamstrings', label: 'Hamstrings' },
        { id: 'adductors', label: 'Adductors' },
      ],
    },
    {
      id: 'shins', label: 'Shins',
      children: [
        { id: 'calves', label: 'Calves' },
        { id: 'tibialis', label: 'Tibialis' },
      ],
    },
    { id: 'feet', label: 'Feet' },
  ],
}

export const JOINT_PAIN_TREE = {
  id: 'joint-root',
  label: 'Joint Pain Points',
  children: [
    { id: 'j-neck', label: 'Neck' },
    { id: 'j-cervical', label: 'Cervical Spine' },
    { id: 'j-thoracic', label: 'Thoracic Spine' },
    { id: 'j-lumbar', label: 'Lumbar Spine' },
    { id: 'j-sacral', label: 'Sacral Spine' },
    { id: 'j-shoulders', label: 'Shoulders' },
    { id: 'j-elbows', label: 'Elbows' },
    { id: 'j-wrists', label: 'Wrists' },
    { id: 'j-hips', label: 'Hips' },
    { id: 'j-knees', label: 'Knees' },
    { id: 'j-ankles', label: 'Ankles' },
  ],
}
