const sequence = ref(0)

export function useSequence() {
  // Function to increment sequence and return the new value
  function getId() {
    sequence.value++
    return sequence.value
  }

  // Return the getId function
  return {
    getId,
  }
}
