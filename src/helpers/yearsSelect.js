export const years = () => {
  const years = []
  for (let i = 1950; i <= new Date().getFullYear(); i++) {
    years.push(i)
  }
  return years
}
